import { VirtualElement } from "@popperjs/core";

export function getVirtualElement(ev: MouseEvent): VirtualElement {
	return {
		getBoundingClientRect: () => ({
			width: 0,
			height: 0,
			top: ev.y,
			right: ev.x,
			bottom: ev.y,
			left: ev.x,
		}),
	} as VirtualElement;
}
