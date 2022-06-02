<template>
	<div class="home-features">
		<div class="features-bar">
			<h3>Features</h3>
		</div>
		<div class="feature-list">
			<div class="feature-column">
				<div card="emote-sets" class="feature-card">
					<h3>{{ t("home.features.emote_sets.name") }}</h3>
					<p>{{ t("home.features.emote_sets.detail") }}</p>
				</div>
				<div card="many_emote_slots" class="feature-card alt">
					<h3>{{ t("home.features.many_emote_slots.name") }}</h3>
					<p>{{ t("home.features.many_emote_slots.detail", [250, 400]) }}</p>
				</div>
			</div>

			<div class="feature-column">
				<div card="channel_emote_names" class="feature-card">
					<h3>{{ t("home.features.channel_emote_names.name") }}</h3>
					<p>{{ t("home.features.channel_emote_names.detail") }}</p>
				</div>
				<div card="real_time" class="feature-card alt">
					<h3>{{ t("home.features.real_time.name") }}</h3>
					<p>{{ t("home.features.real_time.detail") }}</p>
				</div>
			</div>

			<div class="feature-column">
				<div card="emote_versions" class="feature-card">
					<h3>{{ t("home.features.emote_versions.name") }}</h3>
					<p>{{ t("home.features.emote_versions.detail") }}</p>
				</div>
				<div card="next_gen" class="feature-card alt">
					<h3>{{ t("home.features.next_gen.name") }}</h3>
					<p>{{ t("home.features.next_gen.detail") }}</p>
				</div>
			</div>

			<div class="feature-column">
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
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.home-features {
	display: grid;
	grid-template-columns: 1.5em calc(100% - 1.5em);
	flex-grow: 1;
	@include themify() {
		background-color: darken(themed("backgroundColor"), 3);
		> .feature-list > .feature-column {
			border-bottom: 1px solid themed("backgroundColor");
		}
		.feature-card {
			&.alt {
				background-color: darken(themed("backgroundColor"), 1);
			}
		}
		> .features-bar {
			background-color: darken(themed("backgroundColor"), 4);
		}
	}

	> .features-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		writing-mode: vertical-lr;
		> h3 {
			font-weight: 600;
			letter-spacing: 0.25em;
		}
	}

	> .feature-list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> .feature-column {
			display: flex;
			flex-grow: 1;
		}
	}
	.feature-card {
		padding-top: 1em;
		// clip-path: polygon(0 15%, 100% 0, 100% 75%, 0 100%);
		// clip-path: polygon(100% 100%, 85% 0, 50% 0, 0 0, 0 100%, 50% 100%);
		clip-path: polygon(0% 100%, 0% 0%, 50% 0, 100% 0, 90% 50%, 100% 100%, 50% 100%);
		z-index: 1;
		padding-right: 5%;
		&.alt {
			padding-right: 0;
			padding-left: 4em;
			text-align: end;
			z-index: 0;
			clip-path: polygon(50% 0, 10% 0, 0 50%, 10% 100%, 50% 100%, 100% 100%, 100% 0);
		}
		width: 50%;
		min-height: 8em;

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
