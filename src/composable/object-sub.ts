import { ObjectKind } from "@/structures/Common";
import type { User } from "@/structures/User";
import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import { useWorker, WorkerMessageData } from "./worker";
import { onBeforeUnmount } from "vue";

export function useObjectSubscription() {
	const subs = [] as WorkerMessageData<"EventCommandSubscribe">[];

	const { postMessage, onMessage } = useWorker();

	function watchObject<T extends Watchable>(kind: ObjectKind, object: T, cb?: (obj: T) => void) {
		const kindStr = ObjectKind[kind] as keyof typeof ObjectKind;

		const sub = {
			type: `${kindStr.toLowerCase()}.update`,
			condition: { object_id: object.id },
		};

		postMessage("EventCommandSubscribe", sub);

		onMessage<"EventDispatch">((msg) => {
			if (msg.name !== "EventDispatch") return;
			if (msg.data.body.id !== object.id || msg.data.body.kind !== kind) return;

			ApplyFields(object, [...(msg.data.body.updated ?? [])]);
			ApplyFields(object, [...(msg.data.body.pushed ?? [])], true);
			ApplyFields(object, [...(msg.data.body.pulled ?? [])]);

			if (typeof cb === "function") cb(object);
		});

		subs.push(sub);
	}

	onBeforeUnmount(() => subs.forEach((v) => postMessage("EventCommandUnsubscribe", v)));

	return { watchObject };
}

type Watchable = User | Emote | EmoteSet;

export interface ChangeMap {
	id: string;
	kind: ObjectKind;
	actor: User;
	added: ChangeField[];
	updated: ChangeField[];
	removed: ChangeField[];
	pushed: ChangeField[];
	pulled: ChangeField[];
}

export interface ChangeField {
	key: string;
	index: number | null;
	nested: boolean;
	type: ChangeFieldType;
	old_value: string | null;
	value: string | null;
}

type ChangeFieldType = "string" | "number" | "boolean" | "json";

function ApplyFields<T extends Watchable>(object: T, fields: ChangeField[], push?: boolean): T {
	for (const cf of fields ?? []) {
		const x = Array(2);
		switch (cf.type) {
			case "number":
				x[0] = cf.old_value ? Number(cf.old_value) : null;
				x[1] = cf.value ? Number(cf.value) : null;
				break;
			case "boolean":
				x[0] = cf.old_value ? Boolean(cf.old_value === "true") : null;
				x[1] = cf.value ? Boolean(cf.value === "true") : null;
				break;
			case "string":
				x[0] = cf.old_value?.length ? cf.old_value : null;
				x[1] = cf.value?.length ? cf.value : null;
				break;
			default:
				x[0] = cf.old_value ? cf.old_value : null;
				x[1] = cf.value ? cf.value : null;
		}

		cf.old_value = x[0];
		cf.value = x[1];

		// Handle array change of a nested object
		if (!cf) continue;
		if (cf.nested && typeof cf.index === "number") {
			const nestedFields = cf.value as unknown as ChangeField[];

			const v = (object[cf.key as keyof T] as unknown as (keyof T)[])?.[cf.index] as unknown as Watchable;
			if (!v) continue;

			ApplyFields(v, nestedFields);
		} else if (cf.nested) {
			// Handle change of nested property
			ApplyFields(object[cf.key as keyof T] as unknown as Watchable, cf.value as unknown as ChangeField[]);
		} else if (object[cf.key as keyof T] && typeof cf.index === "number") {
			// Handle change at array index
			if (cf.value === null) {
				(object[cf.key as keyof T] as unknown as (keyof T)[]).splice?.(cf.index, 1);
			} else if (push) {
				(object[cf.key as keyof T] as unknown as (keyof T)[]).splice(cf.index, 0, cf.value as keyof T);
			} else {
				(object[cf.key as keyof T] as unknown as (keyof T)[])[cf.index] = cf.value as keyof T;
			}
		} else if (typeof object !== "undefined" && object !== null) {
			// Handle key change
			object[cf.key as keyof T] = cf.value as unknown as T[keyof T];
		}
	}

	return object;
}
