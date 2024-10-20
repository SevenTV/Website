<template>
	<div v-wave class="emote-set-detail" :active="set.enabled" :full="full" @click="emitToggle">
		<h4>{{ setData.name }}</h4>

		<!-- Slot Count Label -->
		<div selector="label-list">
			<!-- Active State -->
			<label v-if="set.enabled" name="enabled-check">
				<Icon icon="check" />
			</label>

			<!-- Personal Set -->
			<label v-if="set.personal" name="personal">PERSONAL</label>

			<!-- Slot Count -->
			<label name="slot-count" :full="set.full"> {{ setData.emotes.length }} / {{ setData.capacity }} </label>

			<!-- Conflict -->
			<label v-if="set.conflict">{{ t("emote_set.label_conflict").toUpperCase() }}</label>

			<!-- Renamed -->
			<label v-if="ae && ae.data?.name && ae.data.name !== ae.name" v-tooltip="ae.name">
				{{ t("emote_set.label_renamed").toUpperCase() }}
			</label>
		</div>

		<div selector="actions">
			<Icon
				v-if="defaultEmoteSetID === setData.id"
				v-tooltip="t('emote_set.label_default')"
				size="lg"
				icon="bullseye"
				@click.stop="actor.setDefaultEmoteSetID('')"
			/>
			<div
				v-else
				v-tooltip="t('emote_set.modal.context_set_default')"
				class="hoveronly-button"
				selector="default-set-button"
				@click.stop="actor.setDefaultEmoteSetID(setData.id)"
			>
				<Icon size="lg" icon="bullseye-pointer" />
			</div>

			<div
				v-if="diffName && emote"
				v-tooltip="'Rename'"
				selector="rename-button"
				@click.stop="updateEmoteName(set, emote as Emote)"
			>
				<Icon size="lg" icon="pen" />
			</div>

			<Checkbox v-if="data.mode === 'emote'" :checked="!!set.enabled" @update:checked="emitToggle" @click.stop />
			<Radio v-else-if="data.mode === 'assign'" v-model="defaultEmoteSetID" :item-i-d="set.data.id" @click.stop />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import { Emote } from "@/structures/Emote";
import { SetMeta, data, useSetSelector } from "./EmoteSetSelector";
import Checkbox from "../form/Checkbox.vue";
import Radio from "../form/Radio.vue";
import Icon from "../utility/Icon.vue";

const emit = defineEmits<{
	(e: "toggle"): void;
}>();

function emitToggle() {
	emit("toggle");
}

const props = defineProps<{
	set: SetMeta;
	emote?: Emote | null;
}>();

const { t } = useI18n();
const actor = useActor();
const { defaultEmoteSetID } = storeToRefs(actor);
const { updateEmoteName } = useSetSelector();

const setData = ref(props.set.data);

const full = computed(() => props.set.full && !props.set.enabled);
const ae = computed(() =>
	props.emote ? setData.value.emotes.find((ae) => props.emote && ae.id == props.emote.id) : null,
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
		border-color: mix(themed("color"), black, 25%);

		&[active="true"] {
			border-color: themed("accent");
			border-style: solid;
			border-width: 0.1em;
			border-radius: 0.15em;
		}

		&:hover[active="false"] {
			border-color: transparentize(themed("primary"), 0.75%);
			border-style: solid;
			border-width: 0.1em;
			border-radius: 0.15em;
		}

		> div[selector="label-list"] {
			> label {
				background-color: themed("extreme");
				color: themed("color");
				white-space: nowrap;

				&[name="personal"] {
					border: 1px solid $subColor;
					font-weight: 700;
				}

				&[name="slot-count"][full="true"] {
					background-color: themed("warning");
				}

				&[name="enabled-check"] {
					color: themed("accent");
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
			cursor: pointer;
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

		.hoveronly-button {
			visibility: hidden;
		}
	}

	&:hover {
		> div[selector="actions"] > .hoveronly-button {
			visibility: visible;
		}
	}
}
</style>
