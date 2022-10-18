import { Emote } from "@/structures/Emote";
import { User } from "@/structures/User";
import { ObjectKind } from "./Common";

export interface Report {
	id: string;
	target_kind: ObjectKind;
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

	export const NamedKind = (kind: ObjectKind) =>
		({
			[ObjectKind.EMOTE]: "Emote",
			[ObjectKind.USER]: "User",
			[ObjectKind.EMOTE_SET]: "Emote Set",
			[ObjectKind.ENTITLEMENT]: "Entitlement",
			[ObjectKind.MESSAGE]: "Message",
			[ObjectKind.REPORT]: "Report",
			[ObjectKind.BAN]: "Ban",
			[ObjectKind.ROLE]: "Role",
			[0]: "Unknown",
		}[kind]);
}
