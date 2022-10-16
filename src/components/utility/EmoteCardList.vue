<template>
	<div class="emote-card-list">
		<Lazy v-for="(emote, i) in items" :key="i">
			<EmoteCard :emote="emote" :unload="unload" :spooky="seasonalTheme" />
		</Lazy>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { Emote } from "@/structures/Emote";
import { storeToRefs } from "pinia";
import EmoteCard from "./EmoteCard.vue";
import Lazy from "./Lazy.vue";

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
