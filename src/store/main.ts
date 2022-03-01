import { defineStore } from "pinia";
import { EmoteSet } from "@/structures/EmoteSet";
import { LS_KEYS } from "./lskeys";

export interface State {
	authToken: string | null;
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
			authToken: localStorage.getItem(LS_KEYS.TOKEN),
			clientUser: null,
			activeEmotes: [],
			theme: (localStorage.getItem("7tv-theme") || "dark") as Theme,
			changeCount: 0,
			lastChange: 0,
			notFoundMode: null,
			navOpen: false,
			noTransitions: false,
			globalEmoteSet: null,
		} as State),
	getters: {
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
				localStorage.setItem(LS_KEYS.TOKEN, token);
			} else {
				localStorage.removeItem(LS_KEYS.TOKEN);
			}
			this.authToken = token;
		},
		SET_THEME(newTheme: Theme) {
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
		SET_ACTIVE_EMOTES(list: string[]) {
			this.activeEmotes = list;
		},
		SET_GLOBAL_EMOTE_SET(set: EmoteSet) {
			this.globalEmoteSet = set;
		},
	},
});

export type Theme = "light" | "dark";
export type NotFoundMode = "troll-despair" | "doctor-wtf";
