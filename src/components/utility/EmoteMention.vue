<template>
	<a
		v-if="emote"
		ref="emoteMention"
		class="emote-mention"
		:clickable="clickable"
		:href="clickable && emote?.id ? `/emotes/${emote?.id}` : undefined"
	>
		<span v-if="Array.isArray(emote.images) && emote.images.length > 0" selector="emote-image">
			<img
				:src="emote?.images[0].url"
				:srcset="`${emote.images[0].url} 1x, ${emote.images[1].url} 2x, ${emote.images[2].url} 3x`"
			/>
		</span>
		<span selector="emote-name"> {{ emote.name }} </span>
	</a>
</template>

<script setup lang="ts">
import { Emote } from "@/structures/Emote";

defineProps<{
	scale?: string;
	textScale?: string;
	clickable?: boolean;
	emote?: Emote;
}>();
</script>

<style scoped lang="scss">
a.emote-mention {
	color: currentColor;
	display: inline-block;
	align-items: center;

	> [selector="emote-image"] > img {
		vertical-align: middle;
		max-width: 4em;
	}

	> [selector="emote-name"] {
		margin-left: 0.33em;
	}
}
</style>
