import { User } from "./User";

export interface AuditLog {
	id: string;
	kind: AuditLog.Kind;
	created_at: string;
	target_id: string;
	target_kind: number;
	actor: User;
	changes: AuditLog.Change[];
}

export namespace AuditLog {
	export interface Change {
		format: number;
		key: string;
		value: Record<string, object>;
		array_value: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			added: Record<string, any>[];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			updated: Record<string, any>[];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			removed: Record<string, any>[];
		};
	}

	export enum Kind {
		CREATE_EMOTE = 1, // emote was created
		DELETE_EMOTE = 2, // emote was deleted
		DISABLE_EMOTE = 3, // emote was disabled
		UPDATE_EMOTE = 4, // emote was updated
		MERGE_EMOTE = 5, // emote was merged
		UNDO_DELETE_EMOTE = 6, // deleted emote was restored
		ENABLE_EMOTE = 7, // emote was enabled
		SIGN_USER_TOKEN = 20, // a user token was signed
		SIGN_CSRF_TOKEN = 21, // a CSRF token was signed
		REJECTED_ACCESS = 26, // an attempt to access a privileged area was rejected
		CREATE_USER = 30, // user was created
		DELETE_USER = 31, // user was deleted
		BAN_USER = 32, // user was banned
		EDIT_USER = 33, // user was edited
		UNBAN = 36, // user was unbanned
		ADD_USER_EDITOR = 37, // editor added to user
		REMOVE_USER_EDITOR = 38, // editor removed from user
		CREATE_EMOTE_SET = 70, // emote set was created
		UPDATE_EMOTE_SET = 71, // emote set was updated
		DELETE_EMOTE_SET = 72, // emote set was deleted
	}
}
