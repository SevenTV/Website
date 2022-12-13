import { reactive, shallowRef, watch } from "vue";
import type { Component } from "vue";

const options = reactive({
	shown: false,
	interact: "",
	component: null as Component | null,
	props: {} as Record<string, unknown>,
	x: 0,
	y: 0,
});

export function useContextMenu() {
	function open(ev: MouseEvent, component: Component, props: Record<string, unknown>): Promise<string> {
		options.x = ev.clientX;
		options.y = ev.clientY;
		options.shown = true;
		options.component = shallowRef(component);
		options.props = props;

		ev.preventDefault();
		ev.stopPropagation();

		return new Promise<string>((resolve) => {
			const stop = watch(options, (v) => {
				if (v.interact !== "") {
					resolve(v.interact);
				}

				v.interact = "";
				stop();
			});
		});
	}

	function setInteraction(v: string): void {
		options.interact = v;
	}

	return { options, open, setInteraction };
}
