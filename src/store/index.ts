import { Emote } from "@/structures/Emote";
import { DataStructure } from "@typings/typings/DataStructure";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface State {
	theme: "light" | "dark";
	changeCount: number;
	lastChange: number;
	notFoundMode: "troll-despair" | null;
	navOpen: boolean;

	emotes: Map<string, Emote>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		theme: "dark",
		changeCount: 0,
		lastChange: 0,
		notFoundMode: null,
		navOpen: false,

		emotes: new Map<string, Emote>(),
	},
	getters: {
		theme: (state) => state.theme,
		changeCount: (state) => state.changeCount,
		lastChange: (state) => state.lastChange,
		notFoundMode: (state) => state.notFoundMode,
		navOpen: (state) => state.navOpen,
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

		SET_EMOTE: (state: State, m: StructureMutation<DataStructure.Emote>) => {
			if (state.emotes.has(m.id)) {
				const emote = state.emotes.get(m.id) as Emote;
				emote.update(m.data);
			} else {
				state.emotes.set(m.id, Emote.Create(m.data));
			}
		},
	},
	actions: {},
	modules: {},
});

export const useStore = () => {
	return baseUseStore(key);
};

interface StructureMutation<T> {
	id: string;
	data: T;
}
