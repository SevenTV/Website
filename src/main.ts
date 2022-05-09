import { createApp, defineAsyncComponent, h, provide } from "vue";
import router from "@/router";
import RouterPrefetch from "vue-router-prefetch";
import { i18n } from "@/i18n";
import { createHead } from "@vueuse/head";
import vWave from "v-wave";

import "@/icons";

import { DefaultApolloClient } from "@vue/apollo-composable";

import { apolloClient } from "@/apollo";

import directives from "@/directives";
import { createPinia } from "pinia";

const App = defineAsyncComponent(() => import("@/App.vue"));
const FontAwesomeIcon = defineAsyncComponent(async () => {
	const { FontAwesomeIcon } = await import("@fortawesome/vue-fontawesome");
	return FontAwesomeIcon;
});

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render: () => h(App),
});

app.use(createHead())
	.use(createPinia())
	.use(router)
	.use(i18n)
	.use(vWave)
	.use(RouterPrefetch)
	.component("font-awesome-icon", FontAwesomeIcon);

directives(app);

app.mount("#app");
