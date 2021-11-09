import { TooltipDirective } from "@directives/Tooltip";
import { App } from "vue";
import { ClickOutsideDirective } from "./ClickOutside";

const directives = (app: App) => {
	TooltipDirective(app);
	ClickOutsideDirective(app);
};

export default directives;
