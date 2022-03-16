<template>
	<div class="home-content">
		<!-- Downloads -->
		<section selector="downloads">
			<h1>{{ t("common.downloads") }}</h1>
			<div class="platforms-list"></div>
		</section>

		<!-- Features -->
		<section selector="features">
			<h1>Features</h1>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
.home-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	margin: 1em;

	> section[selector="downloads"] {
		height: 12em;
	}
}
</style>
