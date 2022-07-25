import { Emote } from "@structures/Emote";
import { User } from "@structures/User";
import { Common } from "./Common";

export interface Report {
	id: string;
	target_kind: Common.ObjectKind;
	target_id: string;
	actor: User;
	subject: string;
	body: string;
	priority: number;
	status: Report.Status;
	created_at: string | Date;
	assignees: User[];
	notes: string[];

	target?: {
		user?: User;
		emote?: Emote;
	};
}

export namespace Report {
	export enum Status {
		OPEN = "OPEN",
		ASSIGNED = "ASSIGNED",
		CLOSED = "CLOSED",
	}

	export const NamedKind = (kind: Common.ObjectKind) =>
		({
			[Common.ObjectKind.EMOTE]: "Emote",
			[Common.ObjectKind.USER]: "User",
			[Common.ObjectKind.EMOTE_SET]: "Emote Set",
			[Common.ObjectKind.ENTITLEMENT]: "Entitlement",
			[Common.ObjectKind.MESSAGE]: "Message",
			[Common.ObjectKind.REPORT]: "Report",
			[Common.ObjectKind.BAN]: "Ban",
			[Common.ObjectKind.ROLE]: "Role",
			[0]: "Unknown",
		}[kind]);
}
