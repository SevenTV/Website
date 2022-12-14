import { AuditLog } from "@/structures/Audit";
import type { Emote, EmoteVersion } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import type { User } from "@/structures/User";
import { inject, InjectionKey } from "vue";

export type ContextNamespace = "USER" | "EMOTE";

export const USER_CONTEXT_KEY = Symbol() as InjectionKey<UserContext>;
export const EMOTE_CONTEXT_KEY = Symbol() as InjectionKey<EmoteContext>;

export function useContext<NS extends ContextNamespace>(ns: NS) {
	return {
		USER: inject(USER_CONTEXT_KEY, undefined),
		EMOTE: inject(EMOTE_CONTEXT_KEY, undefined),
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
	currentVersion: EmoteVersion | null;
}
