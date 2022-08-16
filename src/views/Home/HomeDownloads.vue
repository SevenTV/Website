<template>
	<main class="home-downloads">
		<!-- Browser Downloads -->
		<div class="download-section" name="browsers">
			<h3>{{ t("home.download_browser") }}</h3>
			<div class="app-list">
				<Icon lib="fab" icon="chrome" @click="openLink(mockLinks.chromium)" />
				<Icon lib="fab" icon="firefox" @click="openLink(mockLinks.firefox)" />
				<Icon lib="fab" icon="edge" @click="openLink(mockLinks.chromium)" />
				<Icon lib="fab" icon="opera" @click="openLink(mockLinks.chromium)" />
			</div>
		</div>

		<!-- Mobile App Downloads -->
		<div class="download-section" name="mobile">
			<h3>{{ t("home.download_mobile") }}</h3>
			<div class="app-list">
				<Chatsen @click="openLink(mockLinks.mobile_chatsen)" />
				<DankChat @click="openLink(mockLinks.mobile_dankchat)" />
			</div>
		</div>

		<div class="download-section" name="other">
			<h3>{{ t("home.download_misc") }}</h3>
			<div class="app-list">
				<ChatterinoLogo @click="openLink(mockLinks.desktop_chatterino)" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ChatterinoLogo from "@components/base/ChatterinoLogo.vue";
import DankChat from "@components/base/DankChat.vue";
import Chatsen from "@components/base/Chatsen.vue";
import Icon from "@/components/utility/Icon.vue";

const { t } = useI18n();

// for now we hardcore the download links
// this should be fetched from api later
const mockLinks = {
	chromium: "https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh",
	firefox: "https://addons.mozilla.org/en-US/firefox/addon/7tv/",

	mobile_chatsen: "https://chatsen.app/",
	mobile_dankchat: "https://play.google.com/store/apps/details?id=com.flxrs.dankchat",

	desktop_chatterino: "https://github.com/SevenTV/chatterino7/releases",
};

const openLink = (url: string): void => {
	window.open(url, "_blank");
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.home-downloads {
	display: flex;
	flex: 1;
}

.download-section {
	padding-top: 1em;
	padding-bottom: 1em;
	text-align: center;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	place-items: center;
	grid-gap: 0.5em;

	@media screen and (min-width: 1200px) {
		&[name="browsers"] {
			padding-left: 10%;
		}
		&[name="other"] {
			padding-right: 10%;
		}

		h3 {
			margin-bottom: 0.5em;
		}
	}
}

.app-list {
	display: flex;
	place-items: center;
	grid-gap: 0.5em;
	> svg {
		cursor: pointer;
		font-size: 4em;
		@media screen and (max-width: 600px) {
			font-size: 3em;
		}
	}
}
</style>
