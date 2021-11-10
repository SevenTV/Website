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
			<div class="main-links">
				<router-link class="nav-link home" to="/"><span>Home</span></router-link>
				<router-link class="nav-link about" to="/about"><span>About</span></router-link>
				<router-link class="nav-link emotes" to="/emotes"><span>Emotes</span></router-link>
				<!-- <router-link class="nav-link admin" to="/admin"><span>Admin</span></router-link> -->
				<!-- <router-link class="nav-link subscribe" to="/subscribe"><span>Subscribe</span></router-link> -->
			</div>
			<div class="account">
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

				<button class="twitch-button" v-on:click="oauth2Authorize()" v-if="clientUser === null">
					<font-awesome-icon :icon="['fab', 'twitch']" class="twitch-icon" />
					<div class="separator"></div>
					<span>SIGN IN</span>
				</button>

				<UserTag :user="clientUser" :scale="'1.5em'"></UserTag>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, reactive } from "vue";
import { useStore } from "@/store";
import { User } from "@/structures/User";
import Logo from "@base/Logo.vue";
import UserTag from "./utility/UserTag.vue";

export default defineComponent({
	components: {
		Logo,
		UserTag,
	},
	setup() {
		const store = useStore();

		/** Request the user to authorize with a third party platform  */
		const oauth2Authorize = () => {
			const w = window.open(
				`${import.meta.env.VITE_APP_API_REST}/v3/auth/twitch`,
				"7TVOAuth2",
				"_blank, width=850, height=650, menubar=no, location=no"
			);

			// Listen for an authorized response
			w?.addEventListener("message", (ev) => {
				if (!ev.data.seventv_msg) {
					return undefined;
				}

				store.commit("SET_USER", ev.data.data.user);
			});
		};
		const data = reactive({
			clientUser: computed(() => store.getters.clientUser as User),
			devstage: "next",
			theme: computed(() => store.getters.theme as "light" | "dark"),
			atTop: false,
			toggleNav() {
				store.commit("SET_NAV_OPEN", !store.getters.navOpen);
			},
			changeTheme(theme: "dark" | "light") {
				store.commit("SET_THEME", theme);
			},
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

		return data;
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/nav.scss";
</style>
