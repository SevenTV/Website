<template>
	<div v-wave class="emote-set-detail" :active="set.enabled" :full="full">
		<h4>{{ set.data.name }}</h4>

		<!-- Slot Count Label -->
		<div selector="label-list">
			<!-- Slot Count -->
			<label name="slot-count" :full="set.full"> {{ set.data.emotes.length }} / {{ set.data.capacity }} </label>

			<!-- Conflict -->
			<label v-if="set.conflict">CONFLICT</label>

			<!-- Renamed -->
			<label v-if="ae && ae.data?.name && ae.data.name !== ae.name">AS {{ ae.name }}</label>
		</div>

		<div selector="actions">
			<div
				v-if="diffName && emote"
				v-tooltip="'Rename'"
				selector="rename-button"
				@click.stop="updateEmoteName(set, emote as Emote)"
			>
				<Icon size="lg" icon="pen" />
			</div>

			<Checkbox v-if="data.mode === 'emote'" :checked="set.enabled" />
			<Radio v-else-if="data.mode === 'assign'" v-model="defaultEmoteSetID" :item-i-d="set.data.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SetMeta, data, useSetSelector } from "./EmoteSetSelector";
import { useActor } from "@/store/actor";
import { storeToRefs } from "pinia";
import { Emote } from "@/structures/Emote";
import Icon from "../utility/Icon.vue";
import Radio from "../form/Radio.vue";
import Checkbox from "../form/Checkbox.vue";

const props = defineProps<{
	set: SetMeta;
	emote?: Emote | null;
}>();

const { defaultEmoteSetID } = storeToRefs(useActor());
const { updateEmoteName } = useSetSelector();

const full = computed(() => props.set.full && !props.set.enabled);
const ae = computed(() =>
	props.emote ? props.set.data.emotes.find((ae) => props.emote && ae.id == props.emote.id) : null,
);

const diffName = computed(() => ae.value && data.customName && ae.value.name !== data.customName);
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

	> div[selector="actions"] {
		display: flex;
		align-items: center;
		gap: 1em;

		[selector="rename-button"] {
			color: lime;

			&:hover {
				color: limegreen;
			}
		}
	}
}
</style>
