import { defineStore } from "pinia";
import { Component, ExtractPropTypes, shallowRef } from "vue";

export interface State {
	components: Map<symbol, Modal>;
}

export const useModal = defineStore("modal-manager", {
	state: () =>
		({
			components: new Map<symbol, Modal>(),
		} as State),
	actions: {
		open(modal: Modal): void {
			const n = modal.component.name;
			modal.component = shallowRef(modal.component);

			this.components.set(Symbol(n), modal);
		},
		close(key: symbol): void {
			this.components.delete(key);
		},
	},
});

export interface Modal<T = object> {
	component: Component;
	props: ExtractPropTypes<T>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	events: { [key: string]: (...args: any[]) => void };
}

export interface ModalEvent {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	args: any[];
}
