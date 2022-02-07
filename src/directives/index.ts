import { TooltipDirective } from "@directives/Tooltip";
import { App } from "vue";
import { ClickOutsideDirective } from "./ClickOutside";
import Wave from "v-wave";

const directives = (app: App) => {
	TooltipDirective(app);
	ClickOutsideDirective(app);
	app.use(Wave);
};

export default directives;
