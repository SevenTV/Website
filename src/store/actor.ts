import { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { ApplyMutation, Update } from "@/structures/Update";
import { User } from "@/structures/User";
import { defineStore } from "pinia";

export interface State {
	user: User | null;
	activeEmotes: Map<string, ActiveEmote>;
}

export const useActorStore = defineStore("actor", {
	state: () =>
		({
			user: null,
			activeEmotes: new Map<string, ActiveEmote>(),
		} as State),
	getters: {
		channelEmoteSets(): EmoteSet[] {
			if (!this.user) {
				return [];
			}

			const a = this.user.connections?.map((uc) => uc.emote_set?.id).filter((s) => s) as string[];
			return this.user.emote_sets?.filter((es) => a.includes(es.id));
		},
	},
	actions: {
		setUser(user: User) {
			this.user = user;
		},
		updateUser(update: Update) {
			ApplyMutation(this.user, update);
		},
		updateActiveEmotes(emotes: ActiveEmote[]) {
			this.activeEmotes = new Map(emotes.map((ae) => [ae.id, ae]));
		},
	},
});
