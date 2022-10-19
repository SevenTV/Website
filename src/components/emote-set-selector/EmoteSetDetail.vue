<template>
	<div v-wave class="emote-set-detail" :active="set.enabled" :full="full">
		<h4>{{ set.data.name }}</h4>

		<!-- Slot Count Label -->
		<div selector="label-list">
			<!-- Slot Count -->
			<label name="slot-count" :full="set.full"> {{ set.data.emotes.length }} / {{ set.data.capacity }} </label>

			<!-- Conflict -->
			<label v-if="set.conflict">CONFLICT</label>
		</div>

		<Checkbox :checked="set.enabled" />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Checkbox from "../form/Checkbox.vue";
import type { SetMeta } from "./EmoteSetSelector";

const props = defineProps<{
	set: SetMeta;
}>();

const full = computed(() => props.set.full && !props.set.enabled);
</script>

<style lang="scss">
@import "@scss/themes.scss";

div.emote-set-detail {
	cursor: pointer;
	display: grid;
	grid-template-columns: auto 1fr auto;
	column-gap: 0.5em;
	align-items: center;
	padding-left: 0.5em;
	height: 3em;
	border: 0.088em dashed;

	@include themify() {
		border-color: mix(themed("color"), black, 25);

		&[active="true"] {
			border-color: themed("primary");
			border-style: solid;
			border-width: 0.1em;
			border-radius: 0.15em;
		}

		> div[selector="label-list"] {
			> label {
				background-color: themed("extreme");
				color: themed("color");

				&[name="slot-count"][full="true"] {
					background-color: themed("warning");
				}
			}
		}
	}

	&[full="true"] {
		pointer-events: none;
		opacity: 0.5;
	}

	overflow: hidden;
	> h4 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 12em;
	}

	> div[selector="label-list"] {
		display: flex;
		gap: 0.175em;

		> label {
			user-select: none;
			font-size: 0.75em;
			padding: 0.33em 0.5em;
			border-radius: 0.25em;
		}
	}
}
</style>
