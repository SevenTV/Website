import type { AnyWorkerMessage, WorkerMessage, WorkerMessageData, WorkerMessageName } from "@/composables/useWorker";
import { EventAPI } from "./worker.events";
import { log } from "@/Logger";

log.setContextName("Worker");

const eventAPI = new EventAPI();
eventAPI.connect("WebSocket");

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

export function broadcast<N extends WorkerMessageName>(name: N, data: WorkerMessageData<N>): void {
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

export const target = {
	shared: false,
	ports: [] as MessagePort[],
	bc: null as BroadcastChannel | null,
};
