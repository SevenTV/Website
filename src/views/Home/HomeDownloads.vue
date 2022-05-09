<template>
	<!-- Browser Downloads -->
	<div class="download-section" name="browsers">
		<h3>{{ t("home.download_browser") }}</h3>
		<div class="app-list">
			<font-awesome-icon :icon="['fab', 'chrome']" />
			<font-awesome-icon :icon="['fab', 'firefox']" />
			<font-awesome-icon :icon="['fab', 'edge']" />
			<font-awesome-icon :icon="['fab', 'opera']" />
		</div>
	</div>

	<!-- Mobile App Downloads -->
	<div class="download-section" name="mobile">
		<h3>{{ t("home.download_mobile") }}</h3>
		<div class="app-list">
			<Chatsen />
		</div>
	</div>

	<div class="download-section" name="other">
		<h3>{{ t("home.download_misc") }}</h3>
		<div class="app-list">
			<ChatterinoLogo />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ChatterinoLogo from "@/components/base/ChatterinoLogo.vue";
import Chatsen from "@/components/base/Chatsen.vue";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.download-section {
	padding-top: 1em;
	padding-bottom: 1em;
	text-align: center;
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	&[name="browsers"] {
		padding-left: 10%;
	}
	&[name="other"] {
		padding-right: 10%;
	}

	h3 {
		transform: rotate(-1deg);
		margin-bottom: 0.5em;
	}
}

.app-list {
	> svg {
		cursor: pointer;
		margin-right: 0.25em;
		font-size: 4em;
		@media screen and (max-width: 600px) {
			font-size: 3em;
		}
	}
}
</style>
