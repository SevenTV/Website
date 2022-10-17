<template>
	<div class="emote-set-card">
		<router-link
			class="unstyled-link"
			selector="card-content"
			:to="{ name: 'EmoteSet', params: { setID: set.id } }"
		>
			<span selector="title"> {{ set.name }} </span>
			<div selector="emotes">
				<div v-for="emote in emotes" :key="emote.id">
					<img v-if="emote.id" class="emote-img" :srcset="imageData(emote)" />
					<Icon v-else class="emote-img" icon="square" />
				</div>
			</div>
			<div selector="stats">
				<span> {{ set.emotes.length }} / {{ set.capacity }} </span>
			</div>
		</router-link>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { ActiveEmote, EmoteSet } from "@structures/EmoteSet";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import Icon from "./Icon.vue";
import { getImage } from "@/structures/Common";

const props = defineProps({
	set: {
		type: Object as PropType<EmoteSet>,
		required: true,
	},
});

const { preferredFormat } = storeToRefs(useActor());

const emotes = computed(() => {
	const ary = Array(0);
	for (let i = 0; i < 10; i++) {
		ary[i] = props.set.emotes[i] ?? { id: "" };
	}

	return ary;
});

const imageData = (ae: ActiveEmote): string => {
	if (!ae.data) {
		return "";
	}

	return Array(3)
		.fill(0)
		.map((_, i) => getImage(ae.data.host, preferredFormat.value, i + 1))
		.map((im, i) => `${im?.url ?? ""} ${i + 1}x`)
		.join(", ");
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-set-card {
	width: 24em;
	height: 14em;
	border-radius: 0.35em;
	@include themify() {
		background-color: darken(themed("backgroundColor"), 3);
	}

	&:hover {
		cursor: pointer;
		@include themify() {
			background-color: darken(themed("backgroundColor"), 4);
		}
	}

	> [selector="card-content"] {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		height: 100%;
		padding: 1em;

		> span[selector="title"] {
			display: flex;
			justify-content: center;
			font-size: 1.175em;
			font-weight: 200;
		}

		> div[selector="emotes"] {
			height: 100%;
			display: grid;
			align-items: center;
			justify-items: center;
			grid-template-columns: repeat(5, 1fr);
			padding: 0.5em;
			border-radius: 0.25em;

			@include themify() {
				background-color: darken(themed("backgroundColor"), 4);
				filter: drop-shadow(0 0 0.2em themed("backgroundColor"));
			}

			.emote-img {
				transform: translateZ(0);
				width: 3em;
				max-height: 3em;
				object-fit: contain;
			}

			svg.emote-img {
				font-size: 0.25em;
			}
		}

		> div[selector="stats"] {
			display: flex;
			justify-content: center;
			> span {
				color: silver;
			}
		}
	}
}
</style>
