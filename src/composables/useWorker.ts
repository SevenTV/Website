import { onBeforeUnmount } from "vue";
import { makeUniqueId } from "@apollo/client/utilities";
import type { ObjectKind } from "@/structures/Common";
import type { ChangeMap } from "@/worker";
import { handleMessage, target } from "@/worker/worker";

const listeners = new Map<string, (message: WorkerMessage<WorkerMessageName>) => void>();

export function useWorker() {
	function postMessage<N extends WorkerMessageName>(name: N, data: WorkerMessageData<N>) {
		handleMessage({
			name,
			data,
		});
	}

	function createWorker() {
		target.callback = (evt) => {
			for (const fn of listeners.values()) {
				fn(evt);
			}
		};
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
	EventDispatch: { type: string; body: ChangeMap<ObjectKind> };
	EventHello: { heartbeat_interval: number; session_id: string };
	EventHeartbeat: { count: number };
}[N];

export type WorkerMessageName =
	| "EventCommandSubscribe"
	| "EventCommandUnsubscribe"
	| "EventDispatch"
	| "EventHello"
	| "EventHeartbeat";
