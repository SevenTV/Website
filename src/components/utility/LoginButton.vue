<template>
	<button v-if="actor.user === null" class="twitch-button" @click="oauth2Authorize">
		<font-awesome-icon :icon="['fab', 'twitch']" class="twitch-icon" />
		<div class="separator"></div>
		<span> {{ t("nav.sign_in").toUpperCase() }} </span>
	</button>
</template>

<script setup lang="ts">
import { reconnect } from "@/apollo";
import { LocalStorageKeys } from "@store/lskeys";
import { useActorStore } from "@/store/actor";
import { useStore } from "@/store/main";
import { useI18n } from "vue-i18n";

const store = useStore();
const actor = useActorStore();

const { t } = useI18n();

/** Request the user to authorize with a third party platform  */
const oauth2Authorize = () => {
	const w = window.open(
		`${import.meta.env.VITE_APP_API_REST}/auth/twitch?token=${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
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
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
@import "@scss/constants.scss";

.twitch-button {
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 0.25em;
	padding: 0.5em;
	background-color: $twitchColor;
	font: inherit;
	font-size: 0.7em;
	transition: background-color 200ms ease;
	@include themify() {
		border: 0.1em solid themed("color");
	}
	&:hover {
		background-color: mix($twitchColor, black, 85);
	}
	&:focus {
		background-color: mix($twitchColor, black, 70);
	}
	> * {
		color: white;
	}
}
</style>
