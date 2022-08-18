<template>
	<button
		v-if="actor.user === null"
		class="twitch-button"
		:platform="platform"
		@click="oauth2Authorize"
		@contextmenu="selectPlatform"
	>
		<div>
			<Icon lib="fab" :icon="platform.toLowerCase()" class="twitch-icon" />
			<span> {{ t("nav.sign_in").toUpperCase() }} </span>
		</div>
	</button>
</template>

<script setup lang="ts">
import { reconnect } from "@/apollo";
import { LocalStorageKeys } from "@store/lskeys";
import { useActorStore } from "@/store/actor";
import { useStore } from "@/store/main";
import { useI18n } from "vue-i18n";
import { User } from "@/structures/User";
import { inject, ref } from "vue";
import { ContextMenuFunction } from "@/context-menu";
import Icon from "./Icon.vue";
import LoginButtonPlaformVue from "./LoginButtonPlaform.vue";

const store = useStore();
const actor = useActorStore();

const { t } = useI18n();

const platform = ref<User.UserConnectionPlatform>("TWITCH");

/** Request the user to authorize with a third party platform  */
const oauth2Authorize = () => {
	const w = window.open(
		`${import.meta.env.VITE_APP_API_REST}/auth/${platform.value.toLowerCase()}?token=${localStorage.getItem(
			LocalStorageKeys.TOKEN,
		)}`,
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

const ctxMenuUtil = inject<ContextMenuFunction>("ContextMenu");

const selectPlatform = (ev: MouseEvent) => {
	if (typeof ctxMenuUtil !== "function") {
		return;
	}

	ctxMenuUtil(ev, LoginButtonPlaformVue, {}).then((v) => {
		if (!v) {
			return;
		}
		platform.value = v as User.UserConnectionPlatform;
	});
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
@import "@scss/constants.scss";
@import "@scss/common/connection-platforms.scss";

.twitch-button {
	> div:nth-child(1) {
		display: grid;
		align-items: center;
		grid-template-columns: 1.33em auto;
	}

	> .separator {
		width: 0.1em;
		height: 1.25em;
		background-color: currentColor;
	}

	cursor: pointer;
	border-radius: 0.25em;
	padding: 0.33em;
	font: inherit;
	font-size: 0.88em;
	transition: background-color 200ms ease;

	&[platform="TWITCH"] {
		background-color: $twitchBrandColor;
		@include themify() {
			border: 0.25em solid lighten($twitchBrandColor, 12);
		}
		&:hover {
			background-color: mix($twitchBrandColor, black, 85);
		}
		&:focus {
			background-color: mix($twitchBrandColor, black, 70);
		}
	}

	&[platform="DISCORD"] {
		background-color: $discordBrandColor;
		@include themify() {
			border: 0.25em solid lighten($discordBrandColor, 12);
		}
		&:hover {
			background-color: mix($discordBrandColor, black, 85);
		}
		&:focus {
			background-color: mix($discordBrandColor, black, 70);
		}
	}

	> * {
		color: white;
	}
}
</style>
