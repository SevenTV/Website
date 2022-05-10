import { App, DirectiveBinding } from "vue";

const init = (el: HTMLElement, binding: DirectiveBinding) => {
	const position = binding.arg || "top";
	const tooltipText = binding.value || "";

	el.setAttribute("position", position);
	el.setAttribute("tooltip", tooltipText);
};

export const TooltipDirective = (app: App) => {
	app.directive("tooltip", {
		mounted(el, binding) {
			init(el, binding);
		},
		updated(el, binding) {
			init(el, binding);
		},
	});
};
