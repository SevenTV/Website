import { App, DirectiveBinding } from "vue";

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

function init(el: HTMLElement, binding: DirectiveBinding): void {
	const position = binding.arg || "top";
	const tooltipText = binding.value || "";

	el.setAttribute("position", position);
	el.setAttribute("tooltip", tooltipText);
}
