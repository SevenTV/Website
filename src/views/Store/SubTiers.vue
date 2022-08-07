<template>
	<main class="sub-tiers">
		<h3>{{ t("store.sub.incentive") }}</h3>
		<div class="t1-features feature-list">
			<div v-for="f of features.t1" :key="f.name" class="sub-feature">
				<font-awesome-icon v-if="f.icon" size="xl" :icon="['far', f.icon]" />
				<span> {{ t(`store.sub.${f.name}`) }} </span>
			</div>
		</div>

		<h3>{{ t("store.sub.creator_tier") }}</h3>
		<span>{{ t("store.sub.creator_tier_desc") }}</span>
		<div class="t1-features feature-list">
			<div v-for="f of features.t2" :key="f.name" class="sub-feature">
				<font-awesome-icon v-if="f.icon" size="xl" :icon="['far', f.icon]" />
				<span> {{ t(`store.sub.${f.name}`) }} </span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

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

	padding-top: 1em;
	padding-left: 5%;
	padding-right: 5%;
	width: 100%;

	@include themify() {
		.sub-feature {
			background-color: lighten(themed("backgroundColor"), 3);
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
		flex-wrap: wrap;
		gap: 1.5em;
		margin-top: 1em;
		margin-bottom: 1em;
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

	@media screen and (max-width: 900px) {
		align-items: center;
		margin: 0;
		gap: 0.5em;
	}
}
</style>
