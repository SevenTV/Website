import { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { defineStore } from "pinia";

export interface State {
	user: User | null;
	activeEmotes: Map<string, ActiveEmote>;
	editableEmoteSets: Map<string, EmoteSet>;
	defaultEmoteSetID: string | null;
}

export const useActorStore = defineStore("actor", {
	state: () =>
		({
			user: null,
			activeEmotes: new Map<string, ActiveEmote>(),
			editableEmoteSets: new Map<string, EmoteSet>(),
			defaultEmoteSetID: localStorage.getItem("default_emote_set_id"),
		} as State),
	getters: {
		channelEmoteSets(): EmoteSet[] {
			if (!this.user) {
				return [];
			}

			const a = this.user.connections?.map((uc) => uc.emote_set_id).filter((s) => s) as string[];
			const result = [] as EmoteSet[];
			for (const es of this.editableEmoteSets.values()) {
				if (a.includes(es.id)) {
					result.push(es);
				}
			}
			return result;
		},
		defaultEmoteSet(): EmoteSet | null {
			if (!this.user) {
				return null;
			}

			return this.defaultEmoteSetID ? this.editableEmoteSets.get(this.defaultEmoteSetID) ?? null : null;
		},
	},
	actions: {
		setUser(user: User) {
			this.user = user;
		},
		updateUser(u: User) {
			if (!this.user) {
				return;
			}
			const user = this.user;
			if (u.username !== user?.username) {
				user.username = u.username;
			}
			if (u.display_name !== user.display_name) {
				user.display_name = u.display_name;
			}
			if (u.email !== user.email) {
				user.email = u.email;
			}
			user.connections = u.connections;
		},
		updateActiveEmotes() {
			this.activeEmotes.clear();
			if (this.defaultEmoteSet && Array.isArray(this.defaultEmoteSet.emotes)) {
				this.defaultEmoteSet.emotes.forEach((ae) => this.activeEmotes.set(ae.id, ae));
			}
		},
		setDefaultEmoteSetID(id: string) {
			if (id) {
				localStorage.setItem("default_emote_set_id", id);
				this.defaultEmoteSetID = id;
				this.defaultEmoteSet?.emotes.forEach((ae) => this.activeEmotes.set(ae.id, ae));
			} else {
				localStorage.removeItem("default_emote_set_id");
				this.defaultEmoteSet?.emotes
					.filter((ae) => !ae._channel)
					.forEach((ae) => this.activeEmotes.delete(ae.id));
				this.defaultEmoteSetID = "";
			}
		},

		// Editable Emote Sets
		addEmoteSet(set: EmoteSet) {
			this.editableEmoteSets.set(set.id, set);
		},
		removeEmoteSet(id: string) {
			this.editableEmoteSets.delete(id);
		},
	},
});
