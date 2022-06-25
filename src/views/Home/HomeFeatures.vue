<template>
	<div class="home-features">
		<div class="feature-list">
			<div card="emote-sets" class="feature-card">
				<h3>{{ t("home.features.emote_sets.name") }}</h3>
				<p>{{ t("home.features.emote_sets.detail") }}</p>
			</div>
			<div card="many_emote_slots" class="feature-card alt">
				<h3>{{ t("home.features.many_emote_slots.name") }}</h3>
				<p>{{ t("home.features.many_emote_slots.detail", [250, 400]) }}</p>
			</div>

			<div card="channel_emote_names" class="feature-card">
				<h3>{{ t("home.features.channel_emote_names.name") }}</h3>
				<p>{{ t("home.features.channel_emote_names.detail") }}</p>
			</div>
			<div card="real_time" class="feature-card alt">
				<h3>{{ t("home.features.real_time.name") }}</h3>
				<p>{{ t("home.features.real_time.detail") }}</p>
			</div>

			<div card="emote_versions" class="feature-card">
				<h3>{{ t("home.features.emote_versions.name") }}</h3>
				<p>{{ t("home.features.emote_versions.detail") }}</p>
			</div>
			<div card="next_gen" class="feature-card alt">
				<h3>{{ t("home.features.next_gen.name") }}</h3>
				<p>{{ t("home.features.next_gen.detail") }}</p>
			</div>

			<div card="source_available" class="feature-card">
				<h3>{{ t("home.features.source_available.name") }}</h3>
				<p>{{ t("home.features.source_available.detail") }}</p>
			</div>
			<div card="placeholder1" class="feature-card alt">
				<h3></h3>
				<p></p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.home-features {
	@include themify() {
		> .feature-list > .feature-column {
			border-bottom: 1px solid themed("backgroundColor");
		}
		.feature-card {
			background-color: darken(themed("backgroundColor"), 1);
		}
	}

	> .feature-list {
		margin-right: 3%;
		margin-left: 3%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex-basis: 33.33%;
	}
	.feature-card {
		padding-top: 1em;
		clip-path: polygon(5% 0, 95% 1%, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%, 0 10%);
		z-index: 1;
		margin: 1em;
		min-height: 12em;
		width: 16em;

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
</style>
