import { App } from "vue";

type ElementWithClickOutsideEvent = HTMLElement & { clickOutsideEvent: (evt: MouseEvent) => void };

export const ClickOutsideDirective = (app: App) => {
	app.directive("click-outside", {
		beforeMount: (el: ElementWithClickOutsideEvent, binding) => {
			el.clickOutsideEvent = (event: MouseEvent) => {
				if (!(el == event.target || el.contains(event.target as Node))) {
					binding.value(event);
				}
			};
			document.addEventListener("click", el.clickOutsideEvent);
		},
		unmounted: (el: ElementWithClickOutsideEvent) => {
			document.removeEventListener("click", el.clickOutsideEvent);
		},
	});
};
