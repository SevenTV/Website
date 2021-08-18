import { createApp, h, provide } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { createHead } from "@vueuse/head";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun as fasSun, faMoon as fasMoon, faCircle as fasCircle, faBars as fasBars, faPlus as fasPlus } from "@fortawesome/free-solid-svg-icons";
import { faChrome as fabChrome, faTwitter as fabTwitter, faGithub as fabGithub, faTwitch as fabTwitch } from "@fortawesome/free-brands-svg-icons";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

library.add(fasSun, fasMoon, fabChrome, fabTwitter, fabGithub, fasCircle, fasBars, fasPlus, fabTwitch);

// API GQL Endpoint
const httpLink = createHttpLink({
	uri: "http://localhost:3000/v2/gql",
});

// Set cache
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},

	render: () => h(App),
});

app.use(createHead()).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
