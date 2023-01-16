import { ObjectKind } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { EventAPI } from "./worker.events";

export interface EventAPIMessage<O extends keyof typeof EventAPIOpCode> {
	op: O;
	data: EventAPIMessageData<O>;
}
export interface EventContext {
	eventAPI: EventAPI;
}

export enum EventAPIOpCode {
	DISPATCH = 0,
	HELLO = 1,
	HEARTBEAT = 2,
	RECONNECT = 4,
	ACK = 5,
	ERROR = 6,
	ENDOFSTREAM = 7,
	IDENTIFY = 33,
	RESUME = 34,
	SUBSCRIBE = 35,
	UNSUBSCRIBE = 36,

	UNKNOWN = 1001,
}

export type EventAPIMessageData<O extends keyof typeof EventAPIOpCode> = {
	DISPATCH: {
		type: string;
		matches: number[];
		body: ChangeMap<ObjectKind>;
	};
	HELLO: {
		session_id: string;
		heartbeat_interval: number;
	};
	HEARTBEAT: {
		count: number;
	};
	RECONNECT: void;
	ACK: {
		id: number;
		command: string;
		data: unknown;
	};
	ERROR: {
		code: number;
		message: string;
	};
	ENDOFSTREAM: void;
	IDENTIFY: void;
	RESUME: void;
	SUBSCRIBE: {
		type: string;
		condition: Record<string, string>;
	};
	UNSUBSCRIBE: {
		type: string;
		condition?: Record<string, string>;
	};
	UNKNOWN: unknown;
}[O];

export interface ChangeMap<K extends ObjectKind> {
	id: string;
	kind: ObjectKind;
	contextual?: boolean;
	actor: User;
	added: ChangeField[];
	updated: ChangeField[];
	removed: ChangeField[];
	pushed: ChangeField[];
	pulled: ChangeField[];
	object: ObjectTypeOfKind[K];
}

export type ObjectType = User | Emote | EmoteSet;

export type ObjectTypeOfKind = {
	[ObjectKind.USER]: User;
	[ObjectKind.EMOTE]: Emote;
	[ObjectKind.EMOTE_SET]: EmoteSet;
	[ObjectKind.ROLE]: unknown;
	[ObjectKind.ENTITLEMENT]: unknown;
	[ObjectKind.BAN]: unknown;
	[ObjectKind.MESSAGE]: unknown;
	[ObjectKind.REPORT]: unknown;
};

export interface ChangeField {
	key: string;
	index: number | null;
	nested?: boolean;
	type: string;
	old_value?: unknown;
	value: unknown;
}

export interface SubscriptionData {
	id?: number;
	type: string;
	condition: Record<string, string>;
}
