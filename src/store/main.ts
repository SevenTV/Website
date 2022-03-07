import { defineStore } from "pinia";
import { EmoteSet } from "@/structures/EmoteSet";
import { LS_KEYS } from "./lskeys";

export interface State {
	authToken: string | null;
	theme: Theme;
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
			theme: (localStorage.getItem("7tv-theme") || "dark") as Theme,
			lastChange: 0,
			notFoundMode: null,
			navOpen: false,
			noTransitions: false,
			globalEmoteSet: null,
		} as State),
	getters: {
		getTheme: (state) => state.theme as Theme,
		getLastChange: (state) => state.lastChange,
		getNotFoundMode: (state) => state.notFoundMode,
		getNavOpen: (state) => state.navOpen,
		getNoTransitions: (state) => state.noTransitions,
	},
	actions: {
		setAuthToken(token: string | null) {
			if (token) {
				localStorage.setItem(LS_KEYS.TOKEN, token);
			} else {
				localStorage.removeItem(LS_KEYS.TOKEN);
			}
			this.authToken = token;
		},
		setTheme(newTheme: Theme) {
			const now = Date.now();
			this.noTransitions = true;
			localStorage.setItem("7tv-theme", newTheme);

			window.requestAnimationFrame(() => {
				this.lastChange = now;
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
		setGlobalEmoteSet(set: EmoteSet) {
			this.globalEmoteSet = set;
		},
	},
});

export type Theme = "light" | "dark";
export type NotFoundMode = "troll-despair" | "doctor-wtf" | "pot-friend";
