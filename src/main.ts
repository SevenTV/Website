import { createApp, h, provide } from "vue";
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

import App from "@/App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
