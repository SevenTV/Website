import { createApp, h, provide } from "vue";
import router from "@/router/router";
import RouterPrefetch from "vue-router-prefetch";
import { i18n } from "@/i18n";
import { plugin as formkit, defaultConfig as formkitConfig } from "@formkit/vue";
import { createHead } from "@vueuse/head";
import vWave from "v-wave";

import "@/icons";
import "@scss/forms.scss"; // TODO: remove this after building a custom theme for forms
import "no-darkreader";

import { DefaultApolloClient } from "@vue/apollo-composable";

import { apolloClient } from "@/apollo";

import { createPinia } from "pinia";

import App from "@/App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TooltipDirective } from "./directives/Tooltip";

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render: () => h(App),
});

formkitConfig;
app.use(createHead())
	.use(createPinia())
	.use(router)
	.use(i18n)
	.use(formkit, formkitConfig)
	.use(vWave)
	.use(RouterPrefetch)
	.directive("tooltip", TooltipDirective)
	.component("font-awesome-icon", FontAwesomeIcon);

// directives(app);

app.mount("#app");
