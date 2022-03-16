import { createApp, h, provide } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { i18n } from "@/i18n/i18n";
import { createHead } from "@vueuse/head";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vWave from "v-wave";

import "@/icons";

import { DefaultApolloClient } from "@vue/apollo-composable";

import { apolloClient } from "@/apollo";

import directives from "@/directives";
import { createPinia } from "pinia";

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
	.component("font-awesome-icon", FontAwesomeIcon)
	.use(vWave);

directives(app);

app.mount("#app");
