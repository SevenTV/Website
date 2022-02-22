import { ClientUser } from "@/structures/ClientUser";
import { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { ApplyMutation, Update } from "@/structures/Update";
import { defineStore } from "pinia";

export interface State {
	user: ClientUser | null;
	activeEmotes: Map<string, ActiveEmote>;
}

export const useActorStore = defineStore("actor", {
	state: () =>
		({
			user: null,
			activeEmotes: new Map<string, ActiveEmote>(),
		} as State),
	getters: {
		getUser(): ClientUser {
			return this.user as ClientUser;
		},
		getChannelEmoteSets(): EmoteSet[] {
			if (!this.user) {
				return [];
			}

			const a = this.user.connections?.map((uc) => uc.emote_set?.id).filter((s) => s) as string[];
			return this.user.emote_sets?.filter((es) => a.includes(es.id));
		},
		getActiveEmotes(): Map<string, ActiveEmote> {
			return this.activeEmotes;
		},
	},
	actions: {
		setUser(user: ClientUser) {
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
