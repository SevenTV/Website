<template>
	<main class="home-downloads">
		<!-- Browser Downloads -->
		<div class="download-section" name="browsers">
			<h3>{{ t("home.download_browser") }}</h3>

			<button v-wave class="browser-download" @click="onBrowserDownload()">
				<Logo color="#29b6f6" />
				<p>
					<span>Stable Release</span>
					<sub :style="{ color: 'lightgreen', opacity: versions.extension && 1 }">
						Version {{ versions.extension }}
					</sub>
				</p>
			</button>

			<button
				v-tooltip="
					'This is our fast-release channel. You\'ll see new features sooner, but we can\'t guarantee it\'ll be stable'
				"
				v-tooltip:position="'bottom'"
				v-wave
				class="browser-download is-nightly-button"
				@click="onBrowserDownload(true)"
			>
				<Logo color="#cc41f2" />
				<p>
					<span>Nightly Release</span>
					<sub :style="{ color: '#cc41f2', opacity: versions['extension-nightly'] && 1 }"
						>Version {{ versions["extension-nightly"] }}</sub
					>
				</p>
			</button>
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
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useActor } from "@/store/actor";
import { useDownloadLink } from "@/composables/useDownloadLink";
import Logo from "@/components/base/Logo.vue";
import ChatsenLogo from "@/components/base/LogoChatsen.vue";
import ChatterinoLogo from "@/components/base/LogoChatterino.vue";
import DankChatLogo from "@/components/base/LogoDankChat.vue";
import LogoFrosty from "@/components/base/LogoFrosty.vue";

const { t } = useI18n();
const actor = useActor();

const browser = actor.agent.getBrowser();

const chromium = useDownloadLink("chromium");
const chromium_nightly = useDownloadLink("chromium_nightly");

const mobile_chatsen = useDownloadLink("mobile_chatsen");
const mobile_frosty = useDownloadLink("mobile_frosty");
const mobile_dankchat = useDownloadLink("mobile_dankchat");

const desktop_chatterino = useDownloadLink("desktop_chatterino");

const isMoz = browser.name === "Firefox";
const versions = reactive({
	extension: "",
	"extension-nightly": "",
});

const configs = ["extension", "extension-nightly"];
for (const s of configs) {
	const res = fetch(`${import.meta.env.VITE_APP_API_REST}/config/${s}`);
	res.then((r) => r.json()).then((r) => {
		versions[s as keyof typeof versions] = r.version;
	});
}

if (isMoz) {
	fetch;
}

const onBrowserDownload = (beta?: boolean) => {
	if (browser.name === "Firefox") {
		window.location.replace(
			"https://extension.7tv.gg/v" + (beta ? versions["extension-nightly"] : versions.extension) + "/ext.xpi",
		);
	} else {
		openLink(beta ? chromium_nightly.value : chromium.value);
	}
};

const openLink = (url: string): void => {
	if (!url) return;
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

	@include themify() {
		.browser-download {
			background-color: lighten(themed("backgroundColor"), 10%);

			&:hover {
				background-color: lighten(themed("backgroundColor"), 20%);
			}
		}
	}

	// make a cool style browser download button
	.browser-download {
		cursor: pointer;
		display: grid;
		grid-template-columns: repeat(2, auto);
		align-items: center;
		flex-direction: column;
		column-gap: 0.5em;
		font-size: 1rem;
		font-weight: 600;
		border: none;
		color: currentColor;
		padding: 0.75rem 1rem;
		text-align: center;
		text-decoration: none;
		width: 12.5rem;

		svg {
			font-size: 2rem;
		}

		p {
			display: grid;
		}

		sub {
			opacity: 0;
		}

		&.is-nightly-button {
			// make a gradient with construction stripes
			$color1: rgba(102, 56, 229, 25%);
			$color2: rgba(56, 78, 218, 25%);

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

		&[active="true"] {
			opacity: 1;
		}
	}
}
</style>
