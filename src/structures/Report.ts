import { User } from "./User";

export interface Report {
	id: string;
	target_kind: Report.TargetKind;
	target: User;
	reporter: User;
	subject: string;
	body: string;
	priority: number;
	status: Report.Status;
	created_at: string | Date;
	assignee_ids: string[];
	notes: string[];
}

export namespace Report {
	export type TargetKind = "EMOTE" | "USER";

	export enum Status {
		OPEN = "OPEN",
		ASSIGNED = "ASSIGNED",
		CLOSED = "CLOSED",
	}
}
