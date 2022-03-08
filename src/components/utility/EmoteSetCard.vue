<template>
	<div class="emote-set-card">
		<router-link
			class="unstyled-link"
			selector="card-content"
			:to="{ name: 'EmoteSet', params: { setID: set.id } }"
		>
			<span selector="title"> {{ set.name }} </span>
			<div selector="emotes">
				<img
					v-for="emote in emotes"
					:key="emote.id"
					:srcset="Emote.GetUrl(emote.emote.images, Common.Image.Format.WEBP, '2x') + ' 2x'"
				/>
			</div>
			<div selector="stats">
				<span> {{ set.emotes.length }} / {{ set.emote_slots }} </span>
			</div>
		</router-link>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import { EmoteSet } from "@/structures/EmoteSet";
import { Emote } from "@/structures/Emote";
import { Common } from "@/structures/Common";

const props = defineProps({
	set: {
		type: Object as PropType<EmoteSet>,
		required: true,
	},
});

const emotes = computed(() => props.set.emotes.slice(0, 5));
</script>

<style lang="scss" scoped>
@import "@scss/components/emote-set-card.scss";
</style>
