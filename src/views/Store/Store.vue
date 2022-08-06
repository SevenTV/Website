<template>
	<main class="store">
		<section class="store-sub-status">
			<SubStatus />

			<span class="sliding-item">
				<Logo />
			</span>
		</section>

		<section class="store-plan-selector"></section>
	</main>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { EgVault } from "./egvault";
import { LocalStorageKeys } from "@/store/lskeys";
import SubStatus from "./SubStatus.vue";
import Logo from "@/components/base/Logo.vue";

useHead({
	title: "Store - 7TV",
});

fetch(`${EgVault.api}/v1/subscriptions/@me`, {
	headers: {
		Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

main.store {
	@include themify() {
		background-color: themed("navBackgroundColor");

		section.store-sub-status {
			border-top-color: themed("navBackgroundColor");
			background-image: linear-gradient(90deg, rgb(250, 170, 0) 50%, rgb(240, 160, 0) 50%);

			> :first-child {
				background-color: transparentize(themed("navBackgroundColor"), 0.25);
			}
		}

		section.store-plan-selector {
			border-top: solid 1em themed("navBackgroundColor");
			background-color: themed("backgroundColor");
		}
	}

	section.store-sub-status {
		display: flex;
		justify-content: center;
		width: 100%;

		border-top: 0.5em solid;
		animation-duration: 90s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-name: bg;
		animation-timing-function: linear;
		background-size: 40px 40px;

		padding-left: 1.5em;
		padding-right: 1.5em;
		clip-path: polygon(15% 100%, 5% 0, 95% 0, 85% 100%); // inverted trapezoid

		> :first-child {
			z-index: 10;
			width: fit-content;
			margin: 1em;
			border-radius: 0.25em;
		}

		span.sliding-item {
			position: absolute;
			top: 8em;
			left: 0;
			animation: 10s sliding-item infinite linear;
			background-color: rgb(41, 41, 41);
			border: 0.1em solid rgb(250, 170, 0);
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
			transform: translateX(0) rotate(-720deg);
		}
		100% {
			transform: translateX(100em) rotate(720deg);
		}
	}

	@keyframes bg {
		0% {
			background-position-x: 0;
		}
		100% {
			background-position-x: 64em;
		}
	}

	section.store-plan-selector {
		width: 100%;
		height: 100%;
	}
}
</style>
