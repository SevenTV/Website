import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { createHead } from '@vueuse/head';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun as fasSun, faMoon as fasMoon, faCircle as fasCircle, faBars as fasBars, faPlus as fasPlus } from '@fortawesome/free-solid-svg-icons';
import { faChrome as fabChrome, faTwitter as fabTwitter, faGithub as fabGithub } from '@fortawesome/free-brands-svg-icons';

library.add(fasSun, fasMoon, fabChrome, fabTwitter, fabGithub, fasCircle, fasBars, fasPlus);

const app = createApp(App);

app.use(createHead()).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
