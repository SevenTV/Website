<template>
	<main class="sub-status">
		<!-- Call action -->
		<div class="cta">
			<h2>{{ t("store.subscribe_cta") }}</h2>

			<div class="sub-logo">
				<Logo />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Logo from "@/components/base/Logo.vue";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.sub-status {
	width: 100%;
	padding: 1em;
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
