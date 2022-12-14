import { AuditLog } from "@/structures/Audit";
import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import type { User } from "@/structures/User";
import { inject, InjectionKey } from "vue";

export type ContextNamespace = "USER";

export const USER_CONTEXT_KEY = Symbol() as InjectionKey<UserContext>;

export interface UserContext {
	user: User;
	currentConn: User.Connection | null;
	emoteSets: EmoteSet[];
	ownedEmotes: Emote[];
	activity: AuditLog[];
}

export function useContext(ns: ContextNamespace) {
	switch (ns) {
		case "USER":
			return inject(USER_CONTEXT_KEY, undefined);
	}
}
