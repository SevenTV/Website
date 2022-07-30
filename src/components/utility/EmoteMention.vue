<template>
	<a
		v-if="emote"
		ref="emoteMention"
		class="emote-mention"
		:clickable="clickable"
		:href="clickable && emote?.id ? `/emotes/${emote?.id}` : undefined"
	>
		<span v-if="Array.isArray(emote.images) && emote.images.length > 0" selector="emote-image">
			<img :src="emote?.images[0].url" :srcset="srcset" />
		</span>
		<span selector="emote-name"> {{ emote.name }} </span>
	</a>
</template>

<script setup lang="ts">
import { Common } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { onUnmounted, ref, watch } from "vue";

const props = defineProps<{
	emote: Emote;
	scale?: string;
	textScale?: string;
	clickable?: boolean;
}>();

const srcset = ref("");

const done = watch(
	props,
	() => {
		const e = props.emote;
		if (!e) {
			return undefined;
		}

		srcset.value = [1, 2, 3, 4]
			.map((im) => Emote.GetImage(e.images ?? [], Common.Image.Format.WEBP, `${im}x` as Emote.Size))
			.map((im, i) => `${im?.url ?? ""} ${i + 1}x`)
			.join(", ");
	},
	{ immediate: true },
);

onUnmounted(() => done());
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
