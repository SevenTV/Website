<template>
	<div class="emote-version">
		<!--  -->
		<span class="version-tag">{{ version?.tag }}</span>
		<span v-if="version?.diverged" class="version-diverged">DIVERGED</span>
		<div class="version-description">{{ version?.description }}</div>
	</div>
</template>

<script lang="ts">
import type { Emote } from "@/structures/Emote";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	props: {
		version: {
			type: Object as PropType<Emote.Versioning>,
			default: {
				tag: "Christmas v1",
				description: "A christmas variant of this emote",
				diverged: true,
				timestamp: new Date().toISOString(),
			} as Emote.Versioning,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/emote-page/emote-version.scss";
</style>
