<template>
	<div class="home-features">
		<h1>{{ t("home.why_app") }}</h1>
		<div class="feature-list">
			<div card="emote-sets" class="feature-card">
				<h3>{{ t("home.features.emote_sets.name") }}</h3>
				<p>{{ t("home.features.emote_sets.detail") }}</p>
			</div>
			<div card="many_emote_slots" class="feature-card alt">
				<h3>{{ t("home.features.many_emote_slots.name") }}</h3>
				<p>{{ t("home.features.many_emote_slots.detail", [300, 600]) }}</p>
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
			<div card="userbase" class="feature-card alt">
				<h3>{{ t("home.features.userbase.name") }}</h3>
				<p>{{ t("home.features.userbase.detail", [userCount, emoteCount]) }}</p>
			</div>
			<div card="next_gen" class="feature-card alt">
				<h3>{{ t("home.features.next_gen.name") }}</h3>
				<p>{{ t("home.features.next_gen.detail") }}</p>
			</div>
			<div card="source_available" class="feature-card">
				<h3>{{ t("home.features.source_available.name") }}</h3>
				<p>{{ t("home.features.source_available.detail") }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const userCount = "1,000,000";
const emoteCount = "200,000";
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.home-features {
	@include themify() {
		> .feature-list > .feature-column {
			border-bottom: 1px solid themed("backgroundColor");
		}
		.feature-card {
			background-color: lighten(themed("backgroundColor"), 3);
		}
	}

	> h1 {
		margin-top: 1.5em;
		margin-bottom: 0.5em;
		font-size: 2em;
		text-align: center;
	}

	> .feature-list {
		display: grid;
		grid-template-columns: repeat(4, auto);
		flex-wrap: wrap;
		justify-content: center;
		flex-basis: 33.33%;
		margin-bottom: 2em;

		@media screen and (max-width: 1400px) {
			grid-template-columns: repeat(3, auto);
		}

		@media screen and (max-width: 1000px) {
			grid-template-columns: repeat(2, auto);
		}

		@media screen and (max-width: 700px) {
			grid-template-columns: repeat(1, auto);
		}
	}
	.feature-card {
		padding: 1.5rem 2em;
		clip-path: polygon(0% 0, 95% 0%, 100% 10%, 100% 100%, 100% 100%, 0% 100%, 0 100%, 0 0);
		z-index: 1;
		margin: 1em;
		min-height: 11em;
		width: 19em;

		> h3 {
			font-weight: 500;
		}
		> p {
			margin-top: 0.5em;
		}
	}
}
</style>
