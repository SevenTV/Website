<template>
	<nav>
		<div class="nav-content" :route="route.name" :transparent="route.meta.transparentNav">
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

					<div class="corpa-ad">
						<a class="unstyled-link" href="https://www.youtube.com/watch?v=QvQpMRkzoVM" target="_blank">
							<img src="http://cdn.7tv.app/emote/612a803421ca87d781a04fd2/3x.webp" />
							<span>2022 Event VOD</span>
						</a>
					</div>
				</div>
				<div class="account">
					<!-- User Search -->
					<div
						v-tooltip="t('nav.user_search')"
						v-tooltip:position="'bottom'"
						class="nav-button"
						@click="userSearch = !userSearch"
					>
						<UserSearchIcon />
					</div>
					<UserQuickSearch v-if="userSearch" @done="userSearch = false" />

					<div class="separator" />

					<!-- Locale -->
					<LocaleSelector />

					<!-- Inbox Button -->
					<router-link v-if="actorUser" class="unstyled-link" to="/inbox">
						<div v-tooltip="t('nav.inbox')" v-tooltip:position="'bottom'" class="nav-button inbox">
							<Icon icon="envelope" />
							<div v-if="actorUser.inbox_unread_count > 0" class="inbox-counter">
								<div>{{ actorUser.inbox_unread_count }}</div>
							</div>
						</div>
					</router-link>

					<div class="nav-button theme">
						<ThemeSwitcher />
					</div>

					<div v-if="actorUser === null" class="twitch-button">
						<LoginButton />
					</div>

					<router-link v-if="actorUser" class="unstyled-link" :to="'/users/' + actorUser.id">
						<UserTag :user="actorUser" scale="1.75em" text-scale="0.75em" :cosmetics="true"></UserTag>
					</router-link>
				</div>
			</div>

			<span v-if="version" class="env">
				{{ version.toString().toUpperCase() }}
			</span>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useActor } from "@store/actor";
import { useI18n } from "vue-i18n";
import { User } from "@/structures/User";
import { useRoute } from "vue-router";
import { useStore } from "@store/main";
import { watch, ref, onBeforeUnmount, defineAsyncComponent } from "vue";
import Icon from "@/components/utility/Icon.vue";
import Logo from "@base/Logo.vue";
import ThemeSwitcher from "@/components/utility/ThemeSwitcher.vue";
import UserSearchIcon from "@/components/base/UserSearchIcon.vue";
import UserTag from "@/components/utility/UserTag.vue";

const UserQuickSearch = defineAsyncComponent(() => import("@/components/utility/UserQuickSearch.vue"));
const LoginButton = defineAsyncComponent(() => import("@/components/utility/LoginButton.vue"));
const LocaleSelector = defineAsyncComponent(() => import("@/components/utility/LocaleSelector.vue"));

const store = useStore();
const { user: actorUser } = storeToRefs(useActor());
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
		condition: () => (actorUser.value ? User.IsPrivileged(actorUser.value) : false),
	},
] as NavLink[]);

// const atTop = ref(false);
const devstage = "merry christmas!";
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
const userSearch = ref(false);

onBeforeUnmount(() => {
	stop.value = true;
});
</script>

<style lang="scss" scoped>
@import "@scss/nav.scss";
</style>
