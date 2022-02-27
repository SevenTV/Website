<template>
	<div class="emote-set-card">
		<router-link
			class="unstyled-link"
			selector="card-content"
			:to="{ name: 'EmoteSet', params: { setID: set.id } }"
		>
			<span selector="title"> {{ set.name }} </span>
			<div selector="emotes">
				<img v-for="emote in emotes" :key="emote.id" :srcset="getUrl(emote.emote, format.WEBP, '2x') + ' 2x'" />
			</div>
			<div selector="stats">
				<span> {{ set.emotes.length }} / {{ set.emote_slots }} </span>
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { EmoteSet } from "@/structures/EmoteSet";
import { Emote } from "@/structures/Emote";
import { Common } from "@/structures/Common";

export default defineComponent({
	props: {
		set: {
			type: Object as PropType<EmoteSet>,
			required: true,
		},
	},
	setup(props) {
		const emotes = computed(() => props.set.emotes.slice(0, 5));

		return {
			emotes,
			getUrl: Emote.GetUrl,
			format: Common.Image.Format,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/emote-set-card.scss";
</style>
