<template>
	<div v-if="version?.name" class="emote-version">
		<div>
			<!--  -->
			<h3 class="version-tag">{{ version?.name }}</h3>
			<span v-if="version?.diverged" class="version-diverged">DIVERGED</span>
			<div class="version-description">{{ version?.description }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Emote } from "@/structures/Emote";
import { defineProps, PropType } from "vue";

defineProps({
	version: {
		type: Object as PropType<Emote.Version>,
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/emote-page/emote-version.scss";
</style>
