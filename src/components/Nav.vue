<template>
	<nav :class="{ atTop }">
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

		<span class="env">
			{{ env?.toString().toUpperCase() }}
		</span>
	</nav>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, reactive, watch } from "vue";
import { useStore } from "@/store";
import { User } from "@/structures/User";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Logo from "@base/Logo.vue";
import UserTag from "@components/utility/UserTag.vue";
import LocaleSelector from "@components/utility/LocaleSelector.vue";
import { reconnect } from "@/apollo";

export default defineComponent({
	components: {
		Logo,
		UserTag,
		LocaleSelector,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const clientUser = computed(() => store.getters.clientUser as User);

		/** Request the user to authorize with a third party platform  */
		const oauth2Authorize = () => {
			const w = window.open(
				`${import.meta.env.VITE_APP_API_REST}/auth/twitch`,
				"7TVOAuth2",
				"_blank, width=850, height=650, menubar=no, location=no"
			);

			// Listen for an authorized response & fetch the authed user
			const i = setInterval(async () => {
				if (!w?.closed) {
					return;
				}
				clearInterval(i);

				await reconnect();
			}, 100);
		};

		const { t } = useI18n();
		const data = reactive({
			clientUser: computed(() => store.getters.clientUser as User),
			devstage: "next",
			env: import.meta.env.VITE_APP_ENV,
			theme: computed(() => store.getters.theme as "light" | "dark"),
			atTop: false,
			toggleNav() {
				store.commit("SET_NAV_OPEN", !store.getters.navOpen);
			},
			changeTheme(theme: "dark" | "light") {
				store.commit("SET_THEME", theme);
			},
			navLinks: [
				{ label: "nav.home", route: "/" },
				{ label: "nav.about", route: "/about" },
				{ label: "nav.emotes", route: "/emotes" },
				{ label: "nav.store", route: "/subscribe", color: "#ffb300" },
				{
					label: t("nav.admin"),
					route: "/admin",
					color: "#0288d1",
					condition: () => User.IsPrivileged(clientUser.value),
				},
			] as NavLink[],
			oauth2Authorize,
			t,
		});

		let stop = false;
		onBeforeUnmount(() => {
			stop = true;
		});

		const i = () => {
			if (stop) return;
			window.requestAnimationFrame(() => {
				data.atTop = !!window.scrollY || route.name !== "Home";
				i();
			});
		};
		i();

		watch(route, () => {
			store.commit("SET_NAV_OPEN", false);
		});

		return data;
	},
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
