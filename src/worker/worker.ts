import type {
	AnyWorkerMessage,
	EventMessage,
	WorkerMessage,
	WorkerMessageData,
	WorkerMessageName,
} from "@/composables/useWorker";
import { log } from "@/Logger";

log.setContextName("Worker");

export class EventAPI {
	private URL = import.meta.env.VITE_APP_API_EVENTS;

	socket: WebSocket | null = null;
	subscriptions: Record<string, SubscriptionRecord[]> = {};
	private backoff = 100;

	connect(): void {
		const ws = (this.socket = new WebSocket(this.URL));

		ws.addEventListener("open", () => this.onOpen());
		ws.addEventListener("close", (evt) => this.onClose(evt));
		ws.addEventListener("error", (evt) => this.onError(evt));
		ws.addEventListener("message", (evt) => this.onMessage(evt));
	}

	send<T>(op: number, data: T): void {
		if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;

		this.socket.send(JSON.stringify({ op, d: data }));
	}

	/**
	 * Subscribe to an event type with conditions
	 *
	 * @param type the type of the event subscription
	 * @param condition
	 */
	subscribe(type: string, condition: Record<string, string>): void {
		const sub = this.getSubscription(type, condition);
		if (sub) {
			sub.count++;
			return;
		}

		if (!Array.isArray(this.subscriptions[type])) {
			this.subscriptions[type] = [];
		}
		this.subscriptions[type].push({
			condition,
			count: 1,
		});

		this.send(35, { type, condition });
		log.info(
			"Added event subscription:",
			type + ",",
			Object.entries(condition)
				.map(([k, v]) => `${k}=${v}`)
				.join(", "),
		);
	}

	unsubscribe(type: string, condition?: Record<string, string>): void {
		const sub = this.getSubscription(type, condition ?? {});
		if (!sub) return;

		if (sub.count <= 1) {
			if (condition) {
				sub.count--;
				this.subscriptions[type] = this.subscriptions[type].filter(
					(c) => !Object.entries(condition).every(([key, value]) => c.condition[key] === value),
				);
			} else {
				delete this.subscriptions[type];
			}

			this.send(36, { type, condition });

			log.info(
				"Removed event subscription:",
				type + ",",
				Object.entries(condition ?? {})
					.map(([k, v]) => `${k}=${v}`)
					.join(", "),
			);
		}
	}

	/**
	 * Check if an event is already subscribed to
	 */
	getSubscription(type: string, condition: Record<string, string>): SubscriptionRecord | null {
		const sub = this.subscriptions[type];
		if (!sub) return null;

		return sub.find((c) => Object.entries(condition).every(([key, value]) => c.condition[key] === value)) ?? null;
	}

	private onOpen(): void {
		log.info("WebSocket connection established");
	}

	private onClose(evt: CloseEvent): void {
		log.info("WebSocket connection closed", `code=${evt.code}`, `reason=${evt.reason ?? "unspecified"}`);

		this.socket = null;
		this.reconnect();
	}

	private onError(evt: Event): void {
		log.error("WebSocket connection error", (evt as ErrorEvent).message);
	}

	private onMessage(evt: MessageEvent): void {
		log.debug("WebSocket connection message", evt.data);

		const message = JSON.parse(evt.data) as EventMessage;

		switch (message.op) {
			// dispatch
			case 0:
				broadcast("EventDispatch", message.d as WorkerMessageData<"EventDispatch">);
				break;
			// hello
			case 1:
				broadcast("EventHello", message.d as WorkerMessageData<"EventHello">);
				break;
			// heartbeat
			case 2:
				broadcast("EventHeartbeat", message.d as WorkerMessageData<"EventHeartbeat">);
				break;

			default:
				break;
		}
	}

	reconnect(): number {
		const jitter = Math.min((this.backoff += getRandomInt(1000, 5000)), 120000);

		setTimeout(() => {
			if (this.socket) return;

			this.connect();
		}, jitter);

		log.debug("Reconnecting in", jitter.toString(), "ms");

		return jitter;
	}

	disconnect(): void {
		if (!this.socket) return;

		this.socket.close(1000);
		this.socket = null;
	}
}

interface SubscriptionRecord {
	condition: Record<string, string>;
	count: number;
}

const eventAPI = new EventAPI();

eventAPI.connect();

export function handleMessage(evt: MessageEvent): void {
	const msg = evt.data as AnyWorkerMessage;

	switch (msg.name) {
		case "EventCommandSubscribe": {
			const d = msg.data as WorkerMessageData<"EventCommandSubscribe">;

			eventAPI.subscribe(d.type, d.condition);
			break;
		}
		case "EventCommandUnsubscribe": {
			const d = msg.data as WorkerMessageData<"EventCommandUnsubscribe">;

			eventAPI.unsubscribe(d.type, d.condition);
			break;
		}
	}
}

function broadcast<N extends WorkerMessageName>(name: N, data: WorkerMessageData<N>): void {
	const d = {
		name,
		data,
	} as WorkerMessage<N>;

	if (target.shared) {
		for (const port of target.ports) {
			port.postMessage(JSON.stringify(d));
		}
	} else if (target.bc) {
		target.bc.postMessage(JSON.stringify(d));
	}
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const target = {
	shared: false,
	ports: [] as MessagePort[],
	bc: null as BroadcastChannel | null,
};
