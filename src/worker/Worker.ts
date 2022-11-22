import type {
	AnyWorkerMessage,
	EventMessage,
	WorkerMessage,
	WorkerMessageData,
	WorkerMessageName,
} from "@/composable/worker";
import { log } from "@/Logger";

const w = self as unknown as SharedWorkerGlobalScope;

log.setContextName("Worker");

class EventAPI {
	private URL = import.meta.env.VITE_APP_API_EVENTS;

	socket: WebSocket | null = null;
	subscriptions: Record<string, Record<string, string>[]> = {};
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
		if (this.hasSubscription(type, condition)) {
			return;
		}

		if (!Array.isArray(this.subscriptions[type])) {
			this.subscriptions[type] = [];
		}
		this.subscriptions[type].push(condition);

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
		if (!this.hasSubscription(type, condition ?? {})) {
			return;
		}

		if (condition) {
			this.subscriptions[type] = this.subscriptions[type].filter(
				(c) => !Object.entries(condition).every(([key, value]) => c[key] === value),
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

	/**
	 * Check if an event is already subscribed to
	 */
	hasSubscription(type: string, condition: Record<string, string>): boolean {
		const sub = this.subscriptions[type];
		if (!sub) return false;

		return sub.some((c) => Object.entries(condition).every(([key, value]) => c[key] === value));
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

const eventAPI = new EventAPI();

eventAPI.connect();

const ports = [] as MessagePort[];

w.addEventListener("connect", (evt) => {
	const port = evt.ports[0];
	ports.push(port);

	port.start();

	port.addEventListener("message", (evt) => {
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
	});
});

function broadcast<N extends WorkerMessageName>(name: N, data: WorkerMessageData<N>): void {
	const d = {
		name,
		data,
	} as WorkerMessage<N>;

	for (const port of ports) {
		port.postMessage(JSON.stringify(d));
	}
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
