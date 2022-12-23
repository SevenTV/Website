import { inject, InjectionKey } from "vue";
import type { AuditLog } from "@/structures/Audit";
import type { Emote, EmoteVersion } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import type { Report } from "@/structures/Report";
import type { User } from "@/structures/User";

export type ContextNamespace = "USER" | "EMOTE" | "ADMIN_REPORT";

export const USER_CONTEXT_KEY = Symbol() as InjectionKey<UserContext>;
export const EMOTE_CONTEXT_KEY = Symbol() as InjectionKey<EmoteContext>;
export const ADMIN_REPORT_CONTEXT_KEY = Symbol() as InjectionKey<AdminReportContext>;

export function useContext<NS extends ContextNamespace>(ns: NS) {
	return {
		USER: inject(USER_CONTEXT_KEY, undefined),
		EMOTE: inject(EMOTE_CONTEXT_KEY, undefined),
		ADMIN_REPORT: inject(ADMIN_REPORT_CONTEXT_KEY, undefined),
	}[ns];
}

export interface UserContext {
	user: User;
	currentConn: User.Connection | null;
	emoteSets: EmoteSet[];
	ownedEmotes: Emote[];
	activity: AuditLog[];
}

export interface EmoteContext {
	emote: Emote;
	logs: AuditLog[];
	channels: Emote.UserList;
	currentVersion: EmoteVersion | null;
}

export interface AdminReportContext {
	reports: Report[];
	currentReportID: string | null;
	currentReport: Report | null;
	status: Report.Status;
	limit: number;
}
