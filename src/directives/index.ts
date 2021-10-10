import { TooltipDirective } from "@directives/Tooltip";
import { App } from "vue";

const directives = (app: App) => {
	TooltipDirective(app);
};

export default directives;
