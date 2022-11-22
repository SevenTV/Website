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

	ws: WebSocket | null = null;
	subscriptions: Record<string, Record<string, string>[]> = {};

	open(): void {
		const ws = (this.ws = new WebSocket(this.URL));

		ws.addEventListener("open", this.onOpen);
		ws.addEventListener("close", this.onClose);
		ws.addEventListener("error", this.onError);
		ws.addEventListener("message", this.onMessage);
	}

	send<T>(op: number, data: T): void {
		if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

		this.ws.send(JSON.stringify({ op, d: data }));
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

	private onClose(): void {
		log.info("WebSocket connection closed");
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
}

const eventAPI = new EventAPI();

eventAPI.open();

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

			default:
				break;
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
