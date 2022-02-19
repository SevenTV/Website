import type { Emote } from "./Emote";
import type { User } from "./User";

export interface EmoteSet {
	id: string;
	name: string;
	tags: string[];
	emotes: ActiveEmote[];
	emote_slots: number;
	owner: User;
}

export interface ActiveEmote {
	id: string;
	name: string;
	flags: number;
	timestamp: string;
	emote: Emote;
}

export namespace EmoteSet {
	export const HasEmote = (set: EmoteSet, emoteID: string): boolean => {
		if (!set) {
			return false;
		}
		for (const e of set.emotes) {
			if (e.id === emoteID) {
				return true;
			}
		}
		return false;
	};
}