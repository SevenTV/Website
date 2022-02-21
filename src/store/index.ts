import { Update, ApplyMutation } from "@/structures/Update";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { EmoteSet } from "@/structures/EmoteSet";
import { ClientUser } from "@/structures/ClientUser";

export interface State {
	authToken: string | null;
	clientUser: ClientUser | null;
	activeEmotes: string[];
	theme: "light" | "dark";
	changeCount: number;
	lastChange: number;
	notFoundMode: NotFoundMode | null;
	navOpen: boolean;
	noTransitions: boolean;
	globalEmoteSet: EmoteSet | null;
}

export const key: InjectionKey<Store<State>> = Symbol("vuex");

export const store = createStore<State>({
	state: {
		authToken: localStorage.getItem("token"),
		clientUser: null,
		activeEmotes: [],
		theme: "dark",
		changeCount: 0,
		lastChange: 0,
		notFoundMode: null,
		navOpen: false,
		noTransitions: false,
		globalEmoteSet: null,
	},
	getters: {
		authToken: (state) => state.authToken,
		theme: (state) => state.theme,
		changeCount: (state) => state.changeCount,
		lastChange: (state) => state.lastChange,
		notFoundMode: (state) => state.notFoundMode,
		navOpen: (state) => state.navOpen,
		clientUser: (state) => state.clientUser,
		activeEmotes: (state) => state.activeEmotes,
		noTransitions: (state) => state.noTransitions,
	},
	mutations: {
		SET_AUTH_TOKEN: (state: State, token: string | null) => {
			if (token) {
				localStorage.setItem("token", token);
			} else {
				localStorage.removeItem("token");
			}
			state.authToken = token;
		},
		SET_THEME: (state, newTheme: "light" | "dark") => {
			const now = Date.now();
			if (now - state.lastChange > 2000) {
				state.changeCount = 0;
			}

			state.noTransitions = true;
			localStorage.setItem("7tv-theme", newTheme);

			window.requestAnimationFrame(() => {
				state.lastChange = now;
				state.changeCount++;
				state.theme = newTheme;
				window.requestAnimationFrame(() => {
					state.noTransitions = false;
				});
			});
		},
		SET_NOT_FOUND_MODE: (state, newMode: NotFoundMode | null) => {
			state.notFoundMode = newMode;
		},
		SET_NAV_OPEN: (state, newNavOpen: boolean) => {
			state.navOpen = newNavOpen;
		},
		SET_USER: (state: State, user: ClientUser) => (state.clientUser = user),
		UPDATE_USER: (state, update: Update) => ApplyMutation(state.clientUser, update),
		SET_ACTIVE_EMOTES: (state: State, list: string[]) => (state.activeEmotes = list),
		SET_GLOBAL_EMOTE_SET: (state: State, set: EmoteSet) => (state.globalEmoteSet = set),
	},
	actions: {},
	modules: {},
});

export const useStore = () => {
	return baseUseStore(key);
};

type NotFoundMode = "troll-despair" | "doctor-wtf";
