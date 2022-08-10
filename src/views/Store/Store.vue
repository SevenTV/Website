<template>
	<main class="store">
		<section class="store-sub-status">
			<StoreHeading :subbed="subbed" :sub="sub" />

			<span class="sliding-item">
				<Logo />
			</span>
		</section>

		<section v-if="route.name === 'Store'" class="store-content">
			<SubTiers />
			<SubStatus />
		</section>
		<section v-else class="store-routed-content">
			<router-view />
		</section>
	</main>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useEgVault } from "./egvault";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import StoreHeading from "./StoreHeading.vue";
import Logo from "@/components/base/Logo.vue";
import SubTiers from "./SubTiers.vue";
import SubStatus from "./SubStatus.vue";

useHead({
	title: "Store - 7TV",
});

const route = useRoute();

const egv = useEgVault();

const sub = computed(() => egv.subscription?.subscription ?? null);
const subbed = computed(() => egv.subscription?.active ?? false);

watch(
	route,
	(newRoute) => {
		if (newRoute.name === "Store") {
			egv.fetchSub();
		}
	},
	{ immediate: true },
);
egv.fetchProducts();
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

main.store {
	@include themify() {
		section.store-sub-status {
			border-top-color: themed("navBackgroundColor");
			background-image: linear-gradient(90deg, rgb(250, 137, 0) 50%, rgb(240, 132, 0) 50%);

			> :first-child {
				background-color: transparentize(themed("navBackgroundColor"), 0.33);
			}
		}

		section.store-content,
		section.store-routed-content {
			border-top: solid 1em themed("navBackgroundColor");
		}
	}

	section.store-sub-status {
		display: flex;
		justify-content: center;
		width: 100%;

		animation-duration: 90s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-name: bg;
		animation-timing-function: linear;
		background-size: 8em 2em;

		padding-left: 1.5em;
		padding-right: 1.5em;

		> :first-child {
			z-index: 10;
			width: fit-content;
			margin: 0.5em;
			margin-top: 5em;
			border-radius: 0.25em;
		}

		span.sliding-item {
			position: absolute;
			top: 6.5em;
			left: 0;
			animation: 10s sliding-item infinite linear;
			background-color: rgb(41, 41, 41);
			border: 0.25em solid rgb(250, 170, 0);
			border-radius: 0.25em;
			width: 3em;
			height: 3em;

			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				color: rgb(250, 170, 0);
				font-size: 2em;
			}
		}

		@media screen and (max-width: 800px) {
			clip-path: none;
			width: 100%;
		}
	}

	@keyframes sliding-item {
		0% {
			left: -25%;
			transform: rotate(-720deg);
		}
		100% {
			left: 100%;
			transform: rotate(720deg);
		}
	}

	@keyframes bg {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 64em 32em;
		}
	}

	section.store-content,
	section.store-purchase {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 1500px) {
		align-items: center;

		> section.store-content {
			gap: 0;
			flex-direction: column;
		}
	}
}
</style>
