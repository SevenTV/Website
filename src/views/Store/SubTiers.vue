<template>
	<main class="sub-tiers">
		<div class="t1-features feature-list">
			<h3>{{ egv.subscribed ? t("store.sub.current_plan") : t("store.sub.incentive") }}</h3>

			<div v-for="f of features.t1" :key="f.name" class="sub-feature">
				<font-awesome-icon v-if="f.icon" size="xl" :icon="['far', f.icon]" />
				<span> {{ t(`store.sub.${f.name}`) }} </span>
			</div>
		</div>

		<!-- Extra -->
		<div class="extra-tier">
			<font-awesome-icon size="lg" :icon="['far', 'plus']" />
		</div>

		<div class="t2-features feature-list">
			<h3>
				{{ t("store.sub.creator_tier") }}

				<span>{{ t("store.sub.creator_tier_desc") }}</span>
			</h3>
			<div v-for="f of features.t2" :key="f.name" class="sub-feature">
				<font-awesome-icon v-if="f.icon" size="xl" :icon="['far', f.icon]" />
				<span> {{ t(`store.sub.${f.name}`) }} </span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault.js";

const { t } = useI18n();

const features = {
	t1: [
		{ name: "feature_t1_badge", icon: "seal" },
		{ name: "feature_t1_paints", icon: "brush" },
		{ name: "feature_t1_animated_profile_picture", icon: "user" },
		{ name: "feature_t1_zero_width", icon: "object-group" },
		{ name: "feature_t1_global_raffle", icon: "ticket" },
		{ name: "feature_t1_personal_emotes", icon: "smile" },
	] as Feature[],
	t2: [
		{ name: "feature_t2_animated_profile_banner" },
		{ name: "feature_t2_animated_offline_screen" },
		{ name: "feature_t2_extended_sub_emotes" },
	] as Feature[],
};

const egv = useEgVault();

interface Feature {
	name: string;
	icon: string;
	description: string;
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.sub-tiers {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-left: 3em;
	padding-right: 3em;

	min-width: 33%;
	max-width: 50%;

	@include themify() {
		background-color: mix(themed("backgroundColor"), themed("color"), 97.5);
		.sub-feature {
			background-color: lighten(themed("backgroundColor"), 3);
		}

		> .feature-list {
			&.t1-features {
				border-color: mix($subColor, themed("extreme"), 75);
				background-color: mix($subColor, themed("extreme"), 15);
			}

			&.t2-features {
				border-color: mix(themed("primary"), themed("extreme"), 75);
				background-color: mix(themed("primary"), themed("extreme"), 25);
			}
		}
	}

	> h3 {
		font-family: Ubuntu, sans-serif;
		font-size: 1.5em;
	}

	$cardSize: 8em;
	> .feature-list {
		display: grid;
		grid-template-columns: $cardSize $cardSize $cardSize;
		grid-template-areas:
			"header header header"
			"content content content";
		gap: 1.5em;
		margin-top: 1em;
		margin-bottom: 1em;

		> h3 {
			grid-area: header;
			text-align: center;
			font-size: 1.5em;

			> span {
				display: block;
				font-weight: initial;
				font-size: 0.8em;
			}
		}

		&.t1-features,
		&.t2-features {
			grid-area: content;
			border: 0.2em solid;
			border-radius: 0.5em;
			padding: 1em;
		}
	}

	div.extra-tier {
		font-size: 1.5em;
		padding: 0.25em;
		border-radius: 10%;
		border: 0.1em solid;
	}

	.sub-feature {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		border-radius: 0.25em;
		text-align: center;
		overflow-wrap: break-word;
		width: $cardSize;
		min-height: $cardSize;
		padding: 0.5em;
	}

	@media screen and (max-width: 1500px) {
		align-items: center;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		margin: 0;
		gap: 0.5em;
		max-width: initial;

		> div.extra-tier {
			margin-left: 1em;
			margin-right: 1em;
		}
	}

	@media screen and (max-width: 1200px) {
		column-gap: 100%;
		padding: 0;
	}
}
</style>
