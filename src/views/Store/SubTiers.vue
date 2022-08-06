<template>
	<main class="sub-tiers">
		<h3>{{ t("store.sub.incentive") }}</h3>
		<div class="t1-features feature-list">
			<div v-for="f of features.t1" :key="f.name" class="sub-feature">
				<font-awesome-icon v-if="f.icon" size="xl" :icon="['far', f.icon]" />
				<span> {{ f.name }} </span>
			</div>
		</div>

		<h3>{{ t("store.sub.creator_tier") }}</h3>
		<div class="t1-features feature-list">
			<div v-for="f of features.t2" :key="f.name" class="sub-feature">
				<font-awesome-icon v-if="f.icon" size="xl" :icon="['far', f.icon]" />
				<span> {{ f.name }} </span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const features = {
	t1: [
		{ name: "Subscriber Badge", icon: "seal" },
		{ name: "Nametag Paints", icon: "brush" },
		{ name: "Animated Profile Picture", icon: "user" },
		{ name: "Zero-Width Emotes", icon: "object-group" },
		{ name: "Global Emote Raffle Ticket", icon: "ticket" },
		{ name: "Personal Emotes", icon: "smile" },
	] as Feature[],
	t2: [
		{ name: "Animated Profile Banner" },
		{ name: "Animated Offline Screen" },
		{ name: "Extended Sub Emotes" },
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
	flex-direction: column;

	margin-top: 3em;
	margin-left: 5%;
	margin-right: 5%;
	gap: 1em;

	@include themify() {
		.sub-feature {
			background-color: lighten(themed("backgroundColor"), 2);
		}
	}

	> h3 {
		font-family: Ubuntu, sans-serif;
		font-size: 1.5em;
		text-align: center;
		margin-bottom: 0.5em;
	}

	> .feature-list {
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1.5em;
	}

	.sub-feature {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		border-radius: 0.25em;
		text-align: center;
		width: 8em;
		height: 8em;
		padding: 0.5em;
	}
}
</style>
