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
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Subscription } from "./egvault";
import Logo from "@/components/base/Logo.vue";

defineProps<{
	subbed: boolean;
	sub: Subscription | null;
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.store-heading {
	width: 100%;
	padding: 0.5em;
	text-align: center;

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

		@media screen and(max-width: 1200px) {
			margin: 0;
		}

		> .sub-logo {
			font-size: 4em;
			color: rgb(255, 170, 0);
		}
	}
}
</style>
