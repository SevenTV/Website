<template>
	<main class="home-downloads">
		<!-- Browser Downloads -->
		<div class="download-section" name="browsers">
			<h3>{{ t("home.download_browser") }}</h3>

			<div class="branch-switch">
				<div :active="branch === 'live'" class="branch-button" name="live" @click="setBranch('live')">
					<span>Live</span>
				</div>
				<div :active="branch === 'beta'" class="branch-button" name="beta" @click="setBranch('beta')">
					<span>Beta</span>
				</div>
			</div>
			<div class="app-list">
				<Icon
					v-tooltip="'Google Chrome'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="chrome"
					@click="openLink(branch === 'live' ? chromium : chromium_beta)"
				/>

				<Icon
					v-tooltip="'Mozilla Firefox'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="firefox"
					@click="openLink(branch === 'live' ? firefox : firefox_beta)"
				/>

				<Icon
					v-if="branch === 'live'"
					v-tooltip="'Microsoft Edge'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="edge"
					@click="openLink(chromium)"
				/>

				<Icon
					v-if="branch === 'live'"
					v-tooltip="'Opera'"
					v-tooltip:position="'top'"
					lib="fab"
					icon="opera"
					@click="openLink(chromium)"
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
					@click="openLink(mobile_chatsen)"
				/>

				<LogoFrosty
					v-tooltip="'Frosty (Android, iOS)'"
					v-tooltip:position="'top'"
					@click="openLink(mobile_frosty)"
				/>

				<DankChatLogo
					v-tooltip="'DankChat (Android)'"
					v-tooltip:position="'top'"
					@click="openLink(mobile_dankchat)"
				/>
			</div>
		</div>

		<div class="download-section" name="other">
			<h3>{{ t("home.download_misc") }}</h3>
			<div class="app-list">
				<ChatterinoLogo
					v-tooltip="'Chatterino'"
					v-tooltip:position="'top'"
					@click="openLink(desktop_chatterino)"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useDownloadLink } from "@/composables/useDownloadLink";
import ChatsenLogo from "@/components/base/LogoChatsen.vue";
import ChatterinoLogo from "@/components/base/LogoChatterino.vue";
import DankChatLogo from "@/components/base/LogoDankChat.vue";
import LogoFrosty from "@/components/base/LogoFrosty.vue";
import Icon from "@/components/utility/Icon.vue";

const { t } = useI18n();

const chromium = useDownloadLink("chromium");
const firefox = useDownloadLink("firefox");
const chromium_beta = useDownloadLink("chromium_beta");
const firefox_beta = useDownloadLink("firefox_beta");

const mobile_chatsen = useDownloadLink("mobile_chatsen");
const mobile_frosty = useDownloadLink("mobile_frosty");
const mobile_dankchat = useDownloadLink("mobile_dankchat");

const desktop_chatterino = useDownloadLink("desktop_chatterino");

const router = useRouter();
const route = useRoute();

type BranchName = "beta" | "live";
const branch = ref<BranchName>((route.query.extension_branch as BranchName) ?? "live");
function setBranch(name: "beta" | "live") {
	branch.value = name;
	router.push({ query: { extension_branch: name } });
}

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
	align-items: center;
	justify-content: flex-end;
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
	justify-content: center;
	grid-gap: 0.5em;
	padding: 0.5em;
	min-width: 12em;

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

.branch-switch {
	display: flex;
	place-items: center;
	transform: translateY(0.5em);

	$angle: 0.5em;
	clip-path: polygon(
		$angle 0%,
		calc(100% - $angle) 0%,
		100% $angle,
		100% calc(100% - $angle),
		100% 100%,
		$angle 100%,
		0% 100%,
		0% $angle
	);

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 5%);

		> div {
			&:hover {
				background-color: lighten(themed("backgroundColor"), 10%);
			}
		}
	}

	> div.branch-button {
		display: flex;
		align-items: center;
		height: 2em;
		padding: 0 0.5em;
		font-weight: 600;
		cursor: pointer;

		&[name="beta"] {
			// make a gradient with construction stripes
			$color1: rgba(126, 126, 126, 50%);
			$color2: rgba(218, 194, 56, 75%);

			color: rgb(255, 255, 255);
			-webkit-text-stroke: 0.5px black;
			background-image: linear-gradient(
				45deg,
				$color1 25%,
				$color2 25%,
				$color2 50%,
				$color1 50%,
				$color1 75%,
				$color2 75%
			);
		}

		opacity: 0.5;
		&[active="true"] {
			opacity: 1;
		}
	}
}
</style>
