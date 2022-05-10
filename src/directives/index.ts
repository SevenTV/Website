import { App } from "vue";
import Wave from "v-wave";

import { TooltipDirective } from "@directives/Tooltip";
import { ClickOutsideDirective } from "@directives/ClickOutside";

const directives = (app: App) => {
	TooltipDirective(app);
	ClickOutsideDirective(app);
	app.use(Wave);
};

export default directives;
