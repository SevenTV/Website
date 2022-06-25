<template>
	<div class="home-content">
		<!-- Downloads -->
		<section selector="downloads">
			<span class="downloads-bar">
				<h3>{{ t("common.downloads").toUpperCase() }}</h3>
			</span>
			<HomeDownloads />
		</section>

		<!-- Features -->
		<section selector="features">
			<HomeFeatures />
		</section>
	</div>
</template>

<script setup lang="ts">
import HomeDownloads from "@views/Home/HomeDownloads.vue";
import HomeFeatures from "@views/Home/HomeFeatures.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
.home-content {
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	@include themify() {
		> section[selector="features"] {
			.feature-card {
				$color: darken(themed("backgroundColor"), 2);
				border-color: lighten($color, 8);
				background-color: $color;
				box-shadow: 0.075em 0.075em 0.25em darken($color, 8);
			}
		}

		> section[selector="downloads"] {
			background-color: lighten(themed("backgroundColor"), 1);
		}
	}

	> section {
		@media screen and (max-width: 800px) {
			margin: 0;
		}
	}

	> section[selector="features"] {
		display: flex;
		flex-direction: column;
	}

	> section[selector="downloads"] {
		display: flex;
		padding-bottom: 1em;
		padding-top: 1em;
		flex-wrap: wrap;

		> .downloads-bar {
			margin-left: 0.5em;
			display: flex;
			justify-content: center;
			align-items: center;
			writing-mode: vertical-lr;
			> h3 {
				font-weight: 600;
				letter-spacing: 0.25em;
			}
		}
	}
}
</style>
