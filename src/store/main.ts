import { defineStore } from "pinia";
import { EmoteSet } from "@structures/EmoteSet";
import { Role } from "@/structures/Role";
import { LocalStorageKeys } from "@store/lskeys";
import { correctLocale } from "@/i18n";

export interface State {
	authToken: string | null;
	theme: Theme;
	seasonalTheme: boolean;
	lastChange: number;
	notFoundMode: NotFoundMode | null;
	navOpen: boolean;
	noTransitions: boolean;
	globalEmoteSet: EmoteSet | null;
	roles: Map<string, Role>;
	locale: string;
	faPro: boolean;
}

const getBrowserLocale = () => {
	const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

	if (!navigatorLocale) {
		return undefined;
	}

	return navigatorLocale.trim().replace("-", "_").toLowerCase();
};

export const useStore = defineStore("main", {
	state: () =>
		({
			authToken: localStorage.getItem(LocalStorageKeys.TOKEN),
			theme: (localStorage.getItem(LocalStorageKeys.THEME) || "dark") as Theme,
			seasonalTheme: localStorage.getItem(LocalStorageKeys.SEASONAL_THEME) !== "false" ? true : false,
			locale: correctLocale(localStorage.getItem(LocalStorageKeys.LOCALE) || getBrowserLocale() || "en_US"),
			lastChange: 0,
			notFoundMode: null,
			navOpen: false,
			noTransitions: false,
			globalEmoteSet: null,
			roles: new Map(),
			faPro: import.meta.env.VITE_APP_FA_PRO === "true",
		} as State),
	getters: {
		getTheme: (state) => state.theme as Theme,
		getLastChange: (state) => state.lastChange,
		getNotFoundMode: (state) => state.notFoundMode,
		getNavOpen: (state) => state.navOpen,
		getNoTransitions: (state) => state.noTransitions,
		getRoles: (state): Map<string, Role> => state.roles,
	},
	actions: {
		setAuthToken(token: string | null) {
			if (token) {
				localStorage.setItem(LocalStorageKeys.TOKEN, token);
			} else {
				localStorage.removeItem(LocalStorageKeys.TOKEN);
			}
			this.authToken = token;
		},
		setTheme(newTheme: Theme) {
			const now = Date.now();
			this.noTransitions = true;
			localStorage.setItem(LocalStorageKeys.THEME, newTheme);

			window.requestAnimationFrame(() => {
				this.lastChange = now;
				this.theme = newTheme;
				window.requestAnimationFrame(() => {
					this.noTransitions = false;
				});
			});
		},
		setSeasonalTheme(value: boolean) {
			this.seasonalTheme = value;
			localStorage.setItem(LocalStorageKeys.SEASONAL_THEME, String(value));
		},
		setNotFoundMode(newMode: NotFoundMode | null) {
			this.notFoundMode = newMode;
		},
		setNavOpen(newNavOpen: boolean) {
			this.navOpen = newNavOpen;
		},
		setGlobalEmoteSet(set: EmoteSet) {
			this.globalEmoteSet = set;
		},
		setRoleList(roles: Role[]) {
			this.roles = new Map(roles.map((v) => [v.id, v]));
		},
		setLocale(newLocale: string) {
			newLocale = correctLocale(newLocale);
			this.locale = newLocale;
			localStorage.setItem(LocalStorageKeys.LOCALE, newLocale);
		},
	},
});

export type Theme = "light" | "dark";
export type NotFoundMode = "troll-despair" | "doctor-wtf" | "pot-friend";
