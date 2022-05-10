<template>
	<nav :class="{ highlight: store.getNavHighlight }" :route="route.name">
		<router-link class="app-title unstyled-link" to="/">
			<div class="logo">
				<Logo />
			</div>

			<div class="text">
				<span class="name">7tv.app</span>
				<span class="dev-stage-text">{{ devstage }}</span>
			</div>
		</router-link>
		<button class="toggle-collapse" @click="toggleNav">
			<font-awesome-icon :icon="['fas', 'bars']" />
		</button>
		<div class="collapse">
			<div class="nav-links">
				<div v-for="link of navLinks" :key="link.route">
					<router-link v-if="!link.condition || link.condition()" class="nav-link" :to="link.route">
						<span :style="{ color: link.color }">{{ t(link.label).toUpperCase() }}</span>
					</router-link>
				</div>
			</div>
			<div class="account">
				<LocaleSelector />

				<!-- Inbox Button -->
				<router-link v-if="clientUser" class="unstyled-link" to="/inbox">
					<div class="nav-button inbox">
						<font-awesome-icon :icon="['fas', 'inbox']" />
						<div v-if="clientUser.inbox_unread_count > 0" class="inbox-counter">
							<div>{{ clientUser.inbox_unread_count }}</div>
						</div>
					</div>
				</router-link>

				<div class="nav-button theme">
					<font-awesome-icon
						v-if="theme === 'dark'"
						class="unselectable"
						:icon="['fas', 'sun']"
						@click="() => changeTheme('light')"
						@mousedown.prevent
					/>
					<font-awesome-icon
						v-else
						class="unselectable"
						:icon="['fas', 'moon']"
						@click="() => changeTheme('dark')"
						@mousedown.stop
					/>
				</div>
				<div v-if="clientUser" class="nav-button editor-mode">
					<font-awesome-icon :icon="['fas', 'user-edit']" />
				</div>

				<button v-if="clientUser === null" class="twitch-button" @click="oauth2Authorize">
					<font-awesome-icon :icon="['fab', 'twitch']" class="twitch-icon" />
					<div class="separator"></div>
					<span> {{ t("nav.sign_in").toUpperCase() }} </span>
				</button>

				<router-link v-if="clientUser" class="unstyled-link" :to="'/users/' + clientUser.id">
					<UserTag :user="clientUser" scale="1.75em" text-scale="0.75em"></UserTag>
				</router-link>
			</div>
		</div>

		<span v-if="version" class="env">
			{{ version.toString().toUpperCase() }}
		</span>
	</nav>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useStore } from "@store/main";
import { User } from "@structures/User";
import { useRoute } from "vue-router";
import { t } from "@/i18n";
import { reconnect } from "@/apollo";
import { useActorStore } from "@store/actor";
import { storeToRefs } from "pinia";
import { LocalStorageKeys } from "@store/lskeys";
import Logo from "@base/Logo.vue";
import UserTag from "@components/utility/UserTag.vue";
import LocaleSelector from "@components/utility/LocaleSelector.vue";

const store = useStore();
const actorStore = useActorStore();
const route = useRoute();
const { user: clientUser } = storeToRefs(actorStore);

const toggleNav = () => {
	store.setNavOpen(!store.navOpen);
};
const changeTheme = (theme: "dark" | "light") => {
	store.setTheme(theme);
};

/** Request the user to authorize with a third party platform  */
const oauth2Authorize = () => {
	const w = window.open(
		`${import.meta.env.VITE_APP_API_REST}/auth/twitch`,
		"7TVOAuth2",
		"_blank, width=850, height=650, menubar=no, location=no",
	);

	// Listen for an authorized response & fetch the authed user
	const i = setInterval(async () => {
		if (!w?.closed) {
			return;
		}
		clearInterval(i);
		reconnect();
		store.setAuthToken(localStorage.getItem(LocalStorageKeys.TOKEN));
	}, 100);
};

const navLinks = ref([
	{ label: "nav.home", route: "/" },
	{ label: "nav.about", route: "/about" },
	{ label: "nav.emotes", route: "/emotes" },
	{ label: "nav.store", route: "/subscribe", color: "#ffb300" },
	{
		label: "nav.admin",
		route: "/admin",
		color: "#0288d1",
		condition: () => (clientUser.value ? User.IsPrivileged(clientUser.value) : false),
	},
] as NavLink[]);

// const atTop = ref(false);
const devstage = "next";
const theme = computed(() => store.getTheme as "light" | "dark");
const version = import.meta.env.VITE_APP_ENV;

watch(route, () => {
	store.setNavOpen(false);
});

interface NavLink {
	label: string;
	route: string;
	color?: string;
	condition?: () => boolean;
}
</script>

<style lang="scss" scoped>
@import "@scss/nav.scss";
</style>
