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
						<span :style="{ color: link.color }">{{ link.label }}</span>
					</router-link>
				</div>
			</div>
			<div class="account">
				<LocaleSelector />
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

				<i class="material-icons unselectable" @mousedown.stop>swap_vert</i>

				<button v-if="clientUser === null" class="twitch-button" @click="oauth2Authorize">
					<font-awesome-icon :icon="['fab', 'twitch']" class="twitch-icon" />
					<div class="separator"></div>
					<span>SIGN IN</span>
				</button>

				<UserTag :user="clientUser" scale="1.75em" text-scale="0.75em"></UserTag>
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
import { User, UserIsPrivileged } from "@/structures/User";
import { useLazyQuery } from "@vue/apollo-composable";
import { GetUser } from "@/assets/gql/users/user";
import Logo from "@base/Logo.vue";
import UserTag from "@components/utility/UserTag.vue";
import LocaleSelector from "@components/utility/LocaleSelector.vue";
import { useRoute } from "vue-router";

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
		const getUser = useLazyQuery<GetUser>(GetUser);
		const oauth2Authorize = () => {
			const w = window.open(
				`${import.meta.env.VITE_APP_API_REST}/v3/auth/twitch`,
				"7TVOAuth2",
				"_blank, width=850, height=650, menubar=no, location=no"
			);

			// Listen for an authorized response & fetch the authed user
			const i = setInterval(() => {
				if (!w?.closed) {
					return;
				}
				clearInterval(i);

				getUser.load(getUser.document.value, { id: "@me" });
				getUser.onResult((res) => {
					store.commit("SET_USER", res.data.user);
				});
			}, 100);
		};

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
				{ label: "HOME", route: "/" },
				{ label: "ABOUT", route: "/about" },
				{ label: "EMOTES", route: "/emotes" },
				{ label: "SUBSCRIBE", route: "/subscribe", color: "#ffb300" },
				{
					label: "ADMIN",
					route: "/admin",
					color: "#0288d1",
					condition: () => UserIsPrivileged(clientUser.value),
				},
			] as NavLink[],
			oauth2Authorize,
		});

		let stop = false;
		onBeforeUnmount(() => {
			stop = true;
		});

		const i = () => {
			if (stop) return;
			window.requestAnimationFrame(() => {
				data.atTop = !!window.scrollY;
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
