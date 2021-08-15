import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { createHead } from "@vueuse/head";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun as fasSun, faMoon as fasMoon, faStar as fasStar, faMobileAlt as fasMobileAlt, faCircle as fasCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faChrome as fabChrome, faFirefoxBrowser as fabFirefoxBrowser, faTwitter as fabTwitter, faGithub as fabGithub } from "@fortawesome/free-brands-svg-icons";

library.add(fasSun, fasMoon, fasStar, farStar, fabChrome, fabFirefoxBrowser, fasMobileAlt, fabTwitter, fabGithub, fasCircle);

const app = createApp(App);

app.use(createHead()).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
