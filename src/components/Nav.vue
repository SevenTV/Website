<template>
	<nav :route="route.name" :transparent="route.meta.transparentNav">
		<div :class="{ highlight }" class="background-image"></div>
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
			<Icon icon="bars" />
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
				<!-- User Search -->
				<Tooltip :text="t('nav.user_search')" position="bottom">
					<div class="nav-button" @click="userSearch = !userSearch">
						<Icon icon="search" />
					</div>
				</Tooltip>
				<UserQuickSearch v-if="userSearch" @done="userSearch = false" />

				<div class="separator" />

				<!-- Locale -->
				<LocaleSelector />

				<!-- Inbox Button -->
				<router-link v-if="actor.user" class="unstyled-link" to="/inbox">
					<div class="nav-button inbox">
						<Icon icon="envelope" />
						<div v-if="actor.user.inbox_unread_count > 0" class="inbox-counter">
							<div>{{ actor.user.inbox_unread_count }}</div>
						</div>
					</div>
				</router-link>

				<div class="nav-button theme">
					<ThemeSwitcher />
				</div>

				<div v-if="actor.user === null" class="twitch-button">
					<LoginButton />
				</div>

				<router-link v-if="actor.user" class="unstyled-link" :to="'/users/' + actor.user.id">
					<UserTag :user="actor.user" scale="1.75em" text-scale="0.75em"></UserTag>
				</router-link>
			</div>
		</div>

		<span v-if="version" class="env">
			{{ version.toString().toUpperCase() }}
		</span>
	</nav>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "@store/main";
import { User } from "@structures/User";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useActorStore } from "@store/actor";
import Logo from "@base/Logo.vue";
import UserTag from "@components/utility/UserTag.vue";
import LocaleSelector from "@components/utility/LocaleSelector.vue";
import ThemeSwitcher from "./utility/ThemeSwitcher.vue";
import LoginButton from "./utility/LoginButton.vue";
import Tooltip from "./utility/Tooltip.vue";
import UserQuickSearch from "./utility/UserQuickSearch.vue";
import Icon from "./utility/Icon.vue";

const store = useStore();
const actor = useActorStore();
const route = useRoute();
const { t } = useI18n();

const toggleNav = () => {
	store.setNavOpen(!store.navOpen);
};

const navLinks = ref([
	{ label: "nav.home", route: "/" },
	{ label: "nav.emotes", route: "/emotes" },
	{ label: "nav.store", route: "/subscribe", color: "#ffb300" },
	{
		label: "nav.admin",
		route: "/admin",
		color: "#0288d1",
		condition: () => (actor.user && actor.user ? User.IsPrivileged(actor.user) : false),
	},
] as NavLink[]);

// const atTop = ref(false);
const devstage = "v3";
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

const highlight = ref(false);
const stop = ref(false);
const i = () => {
	if (stop.value) {
		return;
	}
	window.requestAnimationFrame(() => {
		highlight.value = !!window.scrollY;
		i();
	});
};

const userSearch = ref(false);

onMounted(() => i());
onBeforeUnmount(() => {
	stop.value = true;
});
</script>

<style lang="scss" scoped>
@import "@scss/nav.scss";
</style>
