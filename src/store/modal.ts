import { Component, ExtractPropTypes, shallowRef } from "vue";
import { defineStore } from "pinia";

export interface State {
	components: Map<string, Modal>;
	clickOutside: boolean;
}

export const useModal = defineStore("modal-manager", {
	state: () =>
		({
			components: new Map<string, Modal>(),
			clickOutside: true,
		} as State),
	actions: {
		open(key: string, modal: Modal): void {
			modal.component = shallowRef(modal.component);
			modal.name = key;

			this.components.set(key, modal);
		},
		close(key: string): void {
			this.components.delete(key);
		},
	},
});

export interface Modal<T = object> {
	component: Component;
	props: ExtractPropTypes<T>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	events: { [key: string]: (...args: any[]) => void };
	name?: string;
}

export interface ModalEvent {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	args: any[];
}
