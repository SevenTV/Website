<template>
	<div class="emote-card-list">
		<Lazy>
			<div
				v-for="emote in items"
				:key="emote.id"
				:ref="(el) => setCardRef(el as HTMLElement)"
				class="emote-card-wrapper"
				:visible="loaded[emote.id]"
				:emote-id="emote.id"
			>
				<EmoteCard
					:unload="unload || !loaded[emote.id]"
					:emote="(emote as ActiveEmote).data ?? emote"
					:emote-actor="(emote as ActiveEmote).actor"
					:origin="(emote as ActiveEmote).origin_id"
					:alias="emote.name"
					:personal-context="personalContext"
				/>
			</div>
		</Lazy>
	</div>
</template>

<script setup lang="ts">
import { Emote } from "@/structures/Emote";
import { ActiveEmote } from "@/structures/EmoteSet";
import { onBeforeUnmount, reactive } from "vue";
import EmoteCard from "./EmoteCard.vue";
import Lazy from "./Lazy.vue";

defineProps<{
	items: (Emote | ActiveEmote)[];
	unload?: boolean;
	personalContext?: boolean;
}>();

const refs = [] as HTMLElement[];
const loaded = reactive<Record<string, number>>({});
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		entry.isIntersecting
			? (loaded[entry.target.getAttribute("emote-id") as string] = 1)
			: (loaded[entry.target.getAttribute("emote-id") as string] = 0);
	});
});

// gather all card elements and observe them
const setCardRef = (el: HTMLElement) => {
	if (el instanceof Element) {
		refs.push(el as HTMLElement);

		observer.observe(el);
	}
};

onBeforeUnmount(() => {
	observer.disconnect();
});
</script>

<style scoped lang="scss">
.emote-card-list > :first-child {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1em;

	.emote-card-wrapper[visible="0"] {
		visibility: hidden;
	}
}
</style>
