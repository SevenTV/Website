import { createApp, h, provide } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { store, key } from "@/store";
import { createHead } from "@vueuse/head";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSun as fasSun,
	faMoon as fasMoon,
	faCircle as fasCircle,
	faBars as fasBars,
	faPlus as fasPlus,
	faSearch as fasSearch,
	faCheck as fasCheck,
	faStar as fasStar,
} from "@fortawesome/free-solid-svg-icons";
import { faChrome as fabChrome, faTwitter as fabTwitter, faGithub as fabGithub, faTwitch as fabTwitch } from "@fortawesome/free-brands-svg-icons";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/apollo";
import directives from "@/directives";

library.add(fasSun, fasMoon, fabChrome, fabTwitter, fabGithub, fasCircle, fasBars, fasPlus, fabTwitch, fasSearch, fasCheck, fasStar);

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},

	render: () => h(App),
});

app.use(createHead()).use(store, key).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");

directives(app);
