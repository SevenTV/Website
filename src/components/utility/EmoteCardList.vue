<template>
	<div class="emote-card-list">
		<EmoteCard v-for="(emote, i) in items" :key="i" :emote="emote" :unload="unload" :spooky="seasonalTheme" />
	</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { Emote } from "@/structures/Emote";
import { storeToRefs } from "pinia";
import EmoteCard from "./EmoteCard.vue";

defineProps<{
	items: Emote[];
	unload?: boolean;
}>();

const { seasonalTheme } = storeToRefs(useStore());
</script>

<style scoped lang="scss">
.emote-card-list {
	display: flex;
	flex-grow: 1;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1em;
}
</style>
