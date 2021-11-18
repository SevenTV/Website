import { Emote } from "./Emote";
import { User } from "./User";

export interface Report {
	id: string;
	target_kind: Report.TargetKind;
	target_id: string;
	reporter: User;
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
	export type TargetKind = "EMOTE" | "USER";

	export enum Status {
		OPEN = "OPEN",
		ASSIGNED = "ASSIGNED",
		CLOSED = "CLOSED",
	}
}
