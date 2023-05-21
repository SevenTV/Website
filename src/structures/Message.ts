import { ObjectKind } from "@/structures/Common";
import { User } from "@/structures/User";

export interface Message {
	id: string;
	kind: Message.Kind;
	created_at: string | Date;
	author_id?: string;
	author?: User;
	read: boolean;

	created_at_formatted: string;
}

export namespace Message {
	export enum Kind {
		EmoteComment = "EMOTE_COMMENT",
		Inbox = "INBOX",
		News = "NEWS",
	}

	export interface Inbox extends Message {
		subject: string;
		content: string;
		important: boolean;
		starred: boolean;
		pinned: boolean;
		placeholders: { [key: string]: string };
	}

	export interface ModRequest<T = unknown> extends Message {
		target_id: string;
		target_kind: ObjectKind;
		wish: "list" | "personal_use";
		actor_country_name: string;
		actor_country_code: string;

		target?: T;
	}
}
