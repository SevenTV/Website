import { createApp, h, provide } from "vue";
import RouterPrefetch from "vue-router-prefetch";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import { apolloClient } from "@/apollo/apollo";
import router from "@/router/router";
import { i18n } from "@/i18n";
import { TooltipDirective } from "./directives/Tooltip";
import App from "@/App.vue";
import "@/icons";
import { plugin as formkit, defaultConfig as formkitConfig } from "@formkit/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@scss/forms.scss";
// TODO: remove this after building a custom theme for forms
import "no-darkreader";
import vWave from "v-wave";

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render: () => h(App),
});

formkitConfig;
app.use(createHead())
	.component("font-awesome-icon", FontAwesomeIcon)
	.directive("tooltip", TooltipDirective)
	.use(createPinia())
	.use(router)
	.use(i18n)
	.use(formkit, formkitConfig)
	.use(vWave)
	.use(RouterPrefetch);

// directives(app);

app.mount("#app");
