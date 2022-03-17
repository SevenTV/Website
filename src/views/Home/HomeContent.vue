<template>
	<div class="home-content">
		<!-- Features -->
		<section selector="features">
			<h1>{{ t("common.features") }}</h1>

			<div class="key-feature-list">
				<div card="instantaneous" class="feature-card">
					<h3>Emote Sets</h3>
				</div>
				<span class="default-slot-slot" />
			</div>
		</section>

		<!-- Downloads -->
		<section selector="downloads">
			<h1>{{ t("common.downloads") }}</h1>
			<div class="platforms-list"></div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
.home-content {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin: 1em;

	@include themify() {
		> section[selector="features"] {
			.feature-card {
				$color: darken(themed("backgroundColor"), 2);
				border-color: lighten($color, 8);
				background-color: $color;
				box-shadow: 0.075em 0.075em 0.25em darken($color, 8);
			}
		}
	}

	> section[selector="features"] {
		margin-left: 15%;
		margin-right: 15%;

		.feature-card {
			margin: 1em;
			width: 24em;
			height: 8em;
			border: 0.01em solid;

			> h3 {
				margin: 0.5em;
				font-weight: 300;
				letter-spacing: 0.05em;
			}
		}
	}

	> section[selector="downloads"] {
		display: none; // TODO
	}
}
</style>
