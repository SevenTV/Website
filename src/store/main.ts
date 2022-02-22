import { defineStore } from "pinia";
import { ClientUser } from "@/structures/ClientUser";
import { EmoteSet } from "@/structures/EmoteSet";
import { ApplyMutation, Update } from "@/structures/Update";

export interface State {
	authToken: string | null;
	clientUser: ClientUser | null;
	activeEmotes: string[];
	theme: Theme;
	changeCount: number;
	lastChange: number;
	notFoundMode: NotFoundMode | null;
	navOpen: boolean;
	noTransitions: boolean;
	globalEmoteSet: EmoteSet | null;
}

export const useStore = defineStore("main", {
	state: () =>
		({
			authToken: localStorage.getItem("token"),
			clientUser: null,
			activeEmotes: [],
			theme: "dark" as Theme,
			changeCount: 0,
			lastChange: 0,
			notFoundMode: null,
			navOpen: false,
			noTransitions: false,
			globalEmoteSet: null,
		} as State),
	getters: {
		getClientUser: (state) => state.clientUser as ClientUser,
		getTheme: (state) => state.theme as Theme,
		getAuthToken: (state) => state.authToken as string,
		getChangeCount: (state) => state.changeCount,
		getLastChange: (state) => state.lastChange,
		getNotFoundMode: (state) => state.notFoundMode,
		getNavOpen: (state) => state.navOpen,
		getActiveEmotes: (state) => state.activeEmotes,
		getNoTransitions: (state) => state.noTransitions,
	},
	actions: {
		SET_AUTH_TOKEN(token: string | null) {
			if (token) {
				localStorage.setItem("token", token);
			} else {
				localStorage.removeItem("token");
			}
			this.authToken = token;
		},
		SET_THEME(newTheme: "light" | "dark") {
			const now = Date.now();
			if (now - this.lastChange > 2000) {
				this.changeCount = 0;
			}

			this.noTransitions = true;
			localStorage.setItem("7tv-theme", newTheme);

			window.requestAnimationFrame(() => {
				this.lastChange = now;
				this.changeCount++;
				this.theme = newTheme;
				window.requestAnimationFrame(() => {
					this.noTransitions = false;
				});
			});
		},
		SET_NOT_FOUND_MODE(newMode: NotFoundMode | null) {
			this.notFoundMode = newMode;
		},
		SET_NAV_OPEN(newNavOpen: boolean) {
			this.navOpen = newNavOpen;
		},
		SET_USER(user: ClientUser) {
			this.clientUser = user;
		},
		UPDATE_USER(update: Update) {
			ApplyMutation(this.clientUser, update);
		},
		SET_ACTIVE_EMOTES(list: string[]) {
			this.activeEmotes = list;
		},
		SET_GLOBAL_EMOTE_SET(set: EmoteSet) {
			this.globalEmoteSet = set;
		},
	},
});

export type Theme = "light" | "dark";
export type NotFoundMode = "" | "troll-despair" | "doctor-wtf";
