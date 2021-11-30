import { User } from "./User";

export interface Message<D> {
	id: string;
	kind: Message.Kind;
	created_at: string | Date;
	data: string;
	parsed: D;
	author?: User;
	read: boolean;
}

export namespace Message {
	export enum Kind {
		EmoteComment = "EMOTE_COMMENT",
		Inbox = "INBOX",
		News = "NEWS",
	}

	export interface Inbox {
		subject: string;
		content: string;
		important: boolean;
		starred: boolean;
		pinned: boolean;
	}
}
