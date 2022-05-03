<template>
	<div class="home-content">
		<!-- Downloads -->
		<section selector="downloads">
			<HomeDownloads />
		</section>

		<!-- Features -->
		<section selector="features">
			<h1>{{ t("common.features") }}</h1>

			<div class="key-feature-list">
				<div card="emote-sets" class="feature-card">
					<h3>{{ t("home.features.emote_sets.name") }}</h3>
					<p>{{ t("home.features.emote_sets.detail") }}</p>
				</div>
				<div card="many_emote_slots" class="feature-card">
					<h3>{{ t("home.features.many_emote_slots.name") }}</h3>
					<p>{{ t("home.features.many_emote_slots.detail") }}</p>
				</div>
				<div card="channel_emote_names" class="feature-card">
					<h3>{{ t("home.features.channel_emote_names.name") }}</h3>
					<p>{{ t("home.features.channel_emote_names.detail") }}</p>
				</div>
				<div card="real_time" class="feature-card">
					<h3>{{ t("home.features.real_time.name") }}</h3>
					<p>{{ t("home.features.real_time.detail") }}</p>
				</div>
				<div card="emote_versions" class="feature-card">
					<h3>{{ t("home.features.emote_versions.name") }}</h3>
					<p>{{ t("home.features.emote_versions.detail") }}</p>
				</div>
				<div card="next_gen" class="feature-card">
					<h3>{{ t("home.features.next_gen.name") }}</h3>
					<p>{{ t("home.features.next_gen.detail") }}</p>
				</div>
				<div card="source_available" class="feature-card">
					<h3>{{ t("home.features.source_available.name") }}</h3>
					<p>{{ t("home.features.source_available.detail") }}</p>
				</div>
				<span class="default-slot-slot" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import HomeDownloads from "./HomeDownloads.vue";

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
		> section[selector="downloads"] {
			background-color: darken(themed("backgroundColor"), 1);
		}
	}

	> section {
		margin-left: 15%;
		margin-right: 15%;

		@media screen and (max-width: 800px) {
			margin: 0;
		}
	}

	> section[selector="features"] {
		margin-top: 1em;

		> .key-feature-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
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
			> p {
				margin: 0.75em;
			}
		}
	}

	> section[selector="downloads"] {
		display: flex;
		border-radius: 0.5em;
		overflow: hidden;

		@media screen and (max-width: 1200px) {
			flex-direction: column;
		}
	}
}
</style>
