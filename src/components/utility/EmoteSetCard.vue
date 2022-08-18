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
					:srcset="Emote.GetImage(emote.emote.images, ImageFormat.WEBP, '2x')?.url + ' 2x'"
				/>
			</div>
			<div selector="stats">
				<span> {{ set.emotes.length }} / {{ set.capacity }} </span>
			</div>
		</router-link>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { EmoteSet } from "@structures/EmoteSet";
import { Emote } from "@structures/Emote";
import { ImageFormat } from "@structures/Common";

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
