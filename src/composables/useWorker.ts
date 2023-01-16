import { makeUniqueId } from "@apollo/client/utilities";
import { onBeforeUnmount } from "vue";
import type { ChangeMap } from "./useObjectSub";
import Worker from "@/worker/shared.worker?sharedworker";
import WorkerD from "@/worker/dedicated.worker?worker";
import { log } from "@/Logger";

let worker: SharedWorker | Worker | null = null;
let shared = false;
const listeners = new Map<string, (message: WorkerMessage<WorkerMessageName>) => void>();

export function useWorker() {
	function postMessage<N extends WorkerMessageName>(name: N, data: WorkerMessageData<N>) {
		if (!worker) return;

		if (shared) {
			(worker as SharedWorker).port.postMessage({
				name,
				data,
			} as WorkerMessage<N>);
		} else {
			(worker as Worker).postMessage({
				name,
				data,
			} as WorkerMessage<N>);
		}
	}

	function createWorker() {
		const onEvent = (evt: MessageEvent) => {
			const d = JSON.parse(evt.data);

			for (const fn of listeners.values()) {
				fn(d);
			}
		};

		if ("SharedWorker" in window) {
			worker = new Worker();

			shared = true;
			worker.port.start();
			worker.port.addEventListener("message", onEvent);
		} else if ("Worker" in window) {
			worker = new WorkerD();

			const bc = new BroadcastChannel("WorkerEvents");
			bc.addEventListener("message", onEvent);
		} else {
			log.error("Browser has no support for WebWorkers - functionality will be degraded");

			return;
		}
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
