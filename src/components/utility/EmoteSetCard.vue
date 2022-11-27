<template>
	<div class="emote-set-card">
		<router-link
			class="unstyled-link"
			selector="card-content"
			:to="{ name: 'EmoteSet', params: { setID: set.id } }"
		>
			<p selector="title">
				<span selector="set-name">{{ set.name }}</span>
				<span v-if="!hideOwner" selector="set-author">
					<UserTag :user="set.owner" scale="0.88rem" text-scale="0.88rem" />
				</span>
			</p>
			<div selector="emotes">
				<div v-for="emote in emotes" :key="emote.id" class="feature-emote">
					<img v-if="emote.id" v-tooltip="emote.name" class="emote-img" :srcset="imageData(emote)" />
					<Icon v-else class="emote-img" icon="square" />
				</div>
			</div>
			<div selector="stats">
				<span selector="set-capacity"> {{ set.emotes.length }} / {{ set.capacity }} </span>
			</div>
		</router-link>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import Icon from "./Icon.vue";
import { getImage } from "@/structures/Common";
import UserTag from "./UserTag.vue";

const props = defineProps<{
	set: EmoteSet;
	hideOwner?: boolean;
}>();

const { preferredFormat } = storeToRefs(useActor());

const emotes = computed(() => {
	const ary = Array(0);
	for (let i = 0; i < 20; i++) {
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
	height: 12em;
	border-radius: 0.35em;
	overflow: hidden;
	clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1em), calc(100% - 1em) 100%, 1em 100%, 0 calc(100% - 1em));

	@include themify() {
		background-color: darken(themed("backgroundColor"), 3);

		p[selector="title"] {
			> span[selector="set-name"] {
				background-color: themed("backgroundColor");
			}
		}

		div[selector="stats"] {
			background-color: themed("backgroundColor");
		}

		&:hover {
			background-color: darken(themed("backgroundColor"), 4);
		}
	}

	&:hover {
		cursor: pointer;
	}

	> [selector="card-content"] {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		height: 100%;

		> p[selector="title"] {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: nowrap;

			> span[selector="set-name"] {
				display: block;
				width: 60%;
				font-size: 1.175em;
				font-weight: 200;
				padding: 0.25em 0.5em;
				padding-right: 1.5em;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				clip-path: polygon(0 0, 100% 0%, calc(100% - 1.5em) 100%, 0% 100%);
			}
			> span[selector="set-author"] {
				padding: 0.33em 0.5em;
			}
		}

		> div[selector="emotes"] {
			height: 8em;
			display: grid;
			align-items: center;
			justify-content: center;
			justify-items: center;
			grid-template-columns: repeat(10, 1.75em);

			.feature-emote:hover {
				z-index: 1;
			}
			.feature-emote > img {
				width: 3em;
				height: 3em;
				object-fit: cover;

				transition: all 170ms ease-in-out;
				clip-path: polygon(0 0, calc(100% - 1em) 0, 100% 100%, 1em 100%);
				clip-path: polygon(45% 0, 100% 0%, 55% 95%, 0% 100%);
				&:hover {
					transform: scale(1.1);
					clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
					border-radius: 0.25em;
				}
			}

			svg.emote-img {
				font-size: 0.25em;
			}
		}

		> div[selector="stats"] {
			display: flex;
			justify-content: center;
			clip-path: polygon(0.5em 0%, calc(100% - 0.5em) 0%, 100% 100%, 0% 100%);
			margin-left: 28%;
			margin-right: 28%;

			> span {
				color: silver;
			}
		}
	}
}
</style>
