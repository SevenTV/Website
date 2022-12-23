<template>
	<main class="home-downloads">
		<!-- Browser Downloads -->
		<div class="download-section" name="browsers">
			<h3>{{ t("home.download_browser") }}</h3>
			<div class="app-list">
				<Icon
					v-tooltip="'Google Chrome'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="chrome"
					@click="openLink(mockLinks.chromium)"
				/>

				<Icon
					v-tooltip="'Mozilla Firefox'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="firefox"
					@click="openLink(mockLinks.firefox)"
				/>

				<Icon
					v-tooltip="'Microsoft Edge'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="edge"
					@click="openLink(mockLinks.chromium)"
				/>

				<Icon
					v-tooltip="'Opera'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="opera"
					@click="openLink(mockLinks.chromium)"
				/>
			</div>
		</div>

		<!-- Mobile App Downloads -->
		<div class="download-section" name="mobile">
			<h3>{{ t("home.download_mobile") }}</h3>
			<div class="app-list">
				<ChatsenLogo
					v-tooltip="'Chatsen (Android, iOS)'"
					v-tooltip:position="'top'"
					@click="openLink(mockLinks.mobile_chatsen)"
				/>

				<LogoFrosty
					v-tooltip="'Frosty (Android, iOS)'"
					v-tooltip:position="'top'"
					@click="openLink(mockLinks.mobile_frosty)"
				/>

				<DankChatLogo
					v-tooltip="'DankChat (Android)'"
					v-tooltip:position="'top'"
					@click="openLink(mockLinks.mobile_dankchat)"
				/>
			</div>
		</div>

		<div class="download-section" name="other">
			<h3>{{ t("home.download_misc") }}</h3>
			<div class="app-list">
				<ChatterinoLogo
					v-tooltip="'Chatterino'"
					v-tooltip:position="'top'"
					@click="openLink(mockLinks.desktop_chatterino)"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ChatterinoLogo from "@/components/base/LogoChatterino.vue";
import DankChatLogo from "@/components/base/LogoDankChat.vue";
import ChatsenLogo from "@/components/base/LogoChatsen.vue";
import Icon from "@/components/utility/Icon.vue";
import LogoFrosty from "@/components/base/LogoFrosty.vue";

const { t } = useI18n();

// for now we hardcode the download links
// this should be fetched from api later
const mockLinks = {
	chromium: "https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh",
	firefox: "https://addons.mozilla.org/en-US/firefox/addon/7tv",

	mobile_chatsen: "https://chatsen.app",
	mobile_frosty: "https://frostyapp.io",
	mobile_dankchat: "https://dank.chat",

	desktop_chatterino: "https://github.com/SevenTV/chatterino7/releases",
};

const openLink = (url: string): void => {
	window.open(`${url}?referrer=${document.location.host}`, "_blank");
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
@import "@scss/common/shape.scss";

main.home-downloads {
	display: flex;
	column-gap: 3em;
	row-gap: 1em;
	margin-left: 4em;
	margin-right: 4em;
	flex: 1;

	flex-wrap: wrap;
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
	padding: 0.5em;

	clip-path: createbevel(1em);

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 5%);

		&:hover {
			background-color: lighten(themed("backgroundColor"), 10%);
		}

		svg:hover {
			color: mix(themed("accent"), themed("color"), 45%);
		}
	}

	svg {
		cursor: pointer;
		font-size: 4em;
	}
}
</style>
