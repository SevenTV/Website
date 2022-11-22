import { makeUniqueId } from "@apollo/client/utilities";
import { onBeforeUnmount } from "vue";
import type { ChangeMap } from "./object-sub";
import Worker from "@/worker/Worker?sharedworker";

let worker: SharedWorker | null = null;
const listeners = new Map<string, (message: WorkerMessage<WorkerMessageName>) => void>();

export function useWorker() {
	function postMessage<N extends WorkerMessageName>(name: N, data: WorkerMessageData<N>) {
		if (!worker) return;

		worker.port.postMessage({
			name,
			data,
		} as WorkerMessage<N>);
	}

	function createWorker() {
		worker = new Worker();

		worker.port.addEventListener("message", (evt) => {
			const d = JSON.parse(evt.data);

			for (const fn of listeners.values()) {
				fn(d);
			}
		});

		worker.port.start();
	}

	const messageListeners = [] as string[];

	function onMessage<N extends WorkerMessageName>(callback: (message: WorkerMessage<N>) => void) {
		const useID = makeUniqueId("events");

		listeners.set(useID, callback as (message: WorkerMessage<WorkerMessageName>) => void);
		messageListeners.push(useID);
	}

	onBeforeUnmount(() => messageListeners.forEach((v) => listeners.delete(v)));

	return {
		createWorker,
		postMessage,
		onMessage,
	};
}

export interface EventMessage {
	op: number;
	t: number;
	d: unknown;
}

export interface AnyWorkerMessage {
	name: WorkerMessageName;
	data: object;
}

export interface WorkerMessage<N extends WorkerMessageName> {
	name: N;
	data: WorkerMessageData<N>;
}

export type WorkerMessageData<N extends WorkerMessageName> = {
	EventCommandSubscribe: {
		type: string;
		condition: Record<string, string>;
	};
	EventCommandUnsubscribe: {
		type: string;
		condition?: Record<string, string>;
	};
	EventDispatch: { type: string; body: ChangeMap };
	EventHello: { heartbeat_interval: number; session_id: string };
	EventHeartbeat: { count: number };
}[N];

export type WorkerMessageName =
	| "EventCommandSubscribe"
	| "EventCommandUnsubscribe"
	| "EventDispatch"
	| "EventHello"
	| "EventHeartbeat";
