<template>
	<main class="store-heading">
		<!-- Call action -->
		<div class="cta">
			<div class="sub-logo">
				<Logo />
			</div>

			<h2 v-if="!subbed">{{ t("store.subscribe_cta") }}</h2>
			<h2 v-else>{{ t("store.subscribed") }}</h2>
		</div>

		<div class="special-offer">
			<div class="special-offer-text">
				<h3>CHRISTMAS SPECIAL OFFER!</h3>
				<p>Gift a subscription to <strong>3</strong> different users to receive a special badge</p>
				<Badge v-if="xmasBadge" :background="xmasBadge.background" :logo="xmasBadge.logo" />
			</div>
			<div class="special-offer-cta"></div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Subscription } from "./egvault";
import Logo from "@/components/base/Logo.vue";
import Badge from "@/components/base/Badge.vue";
import { badgeDefs } from "@/components/utility/BadgeDefs";

defineProps<{
	subbed: boolean;
	sub: Subscription | null;
}>();

const xmasBadge = badgeDefs.find((x) => x.id === "xmasgift");

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.store-heading {
	width: 100%;
	padding: 0.5em;
	text-align: center;

	.special-offer {
		padding: 0.5em;
		background-color: rgba(0, 0, 0, 25%);

		h3 {
			background-image: linear-gradient(22.5deg, #26a1af 35%, #3f78b2 50%, #63eed5 100%);
			background-clip: text;
			font-weight: 900;
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
		}
		p {
			width: 24em;
		}
		svg {
			margin-top: 0.25em;
			font-size: 2em;
		}
	}

	> div.cta {
		display: flex;
		flex-wrap: nowrap;
		text-align: center;
		white-space: nowrap;
		justify-content: space-around;
		align-items: center;
		margin-left: 5%;
		margin-right: 5%;
		gap: 1em;

		@media screen and (max-width: 1200px) {
			margin: 0;
		}

		> .sub-logo {
			font-size: 4em;
			color: rgb(255, 170, 0);
		}
	}
}
</style>
