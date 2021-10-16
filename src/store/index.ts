import { User } from "@/structures/User";
import { Update, ApplyMutation } from "@/structures/Update";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface State {
	theme: "light" | "dark";
	changeCount: number;
	lastChange: number;
	notFoundMode: "troll-despair" | null;
	navOpen: boolean;
	user: User | null;
}

export const key: InjectionKey<Store<State>> = Symbol("vuex");

export const store = createStore<State>({
	state: {
		theme: "dark",
		changeCount: 0,
		lastChange: 0,
		notFoundMode: null,
		navOpen: false,
		user: null,
	},
	getters: {
		theme: (state) => state.theme,
		changeCount: (state) => state.changeCount,
		lastChange: (state) => state.lastChange,
		notFoundMode: (state) => state.notFoundMode,
		navOpen: (state) => state.navOpen,
		user: (state) => state.user,
	},
	mutations: {
		SET_THEME: (state, newTheme: "light" | "dark") => {
			const now = Date.now();
			if (now - state.lastChange > 2000) {
				state.changeCount = 0;
			}
			localStorage.setItem("7tv-theme", newTheme);
			state.lastChange = now;
			state.changeCount++;
			state.theme = newTheme;
		},
		SET_NOT_FOUND_MODE: (state, newMode: "troll-despair" | null) => {
			state.notFoundMode = newMode;
		},
		SET_NAV_OPEN: (state, newNavOpen: boolean) => {
			state.navOpen = newNavOpen;
		},
		SET_USER: (state: State, user: User) => (state.user = user),
		UPDATE_USER: (state, update: Update) => ApplyMutation(state.user, update),
	},
	actions: {},
	modules: {},
});

export const useStore = () => {
	return baseUseStore(key);
};
