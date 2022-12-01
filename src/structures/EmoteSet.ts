import { computed } from "vue";
import type { Emote } from "@/structures/Emote";
import type { User } from "@/structures/User";

export interface EmoteSet {
	id: string;
	name: string;
	tags: string[];
	emotes: ActiveEmote[];
	emote_count: number;
	capacity: number;
	origins: EmoteSetOrigin[];
	owner: User;
}

export interface ActiveEmote {
	id: string;
	name: string;
	flags: number;
	cost?: number; // experimental: quota cost
	timestamp: string;
	data: Emote;
	actor?: User;
	_channel: boolean;
	origin_id?: string | null;
}

export interface EmoteSetOrigin {
	id: string;
	weight: number;
	slices?: number[];
}

export namespace EmoteSet {
	export const hasEmote = (set: EmoteSet, emoteID: string) =>
		computed(() => set.emotes?.filter((ae) => ae.id === emoteID).length > 0);
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
