<template>
	<main class="emote-tag-list">
		<div v-for="tag of tags" :key="tag" class="tag-chip">
			<router-link v-if="clickable" :to="{ name: 'EmoteList', query: { query: tag } }" class="unstyled-link">
				#{{ tag }}
			</router-link>
			<span v-else> #{{ tag }} </span>
			<div v-if="editable" class="tag-delete-btn" @click="removeTag(tag)">
				<Icon icon="close" />
			</div>
		</div>

		<div v-if="editable && !limited" class="tag-add tag-chip">
			<div v-if="!newTag" v-tooltip="t('emote.add_tag')" selector="tag-add-button" @click="newTag = true">
				<Icon size="lg" icon="plus" />
			</div>
			<TextInput
				v-else
				v-model="newTagValue"
				width="5em"
				label="New Tag"
				appearance="flat"
				:autofocus="true"
				@keyup.enter="addTag"
				@blur="newTag = false"
			/>
		</div>
		<div v-if="batchChanges && updated" class="tag-add tag-save-batch tag-chip">
			<div v-tooltip="t('common.save_changes')" selector="tag-add-button" @click="sendBatchUpdate">
				<Icon size="lg" icon="save" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Emote } from "@/structures/Emote";
import TextInput from "@/components/form/TextInput.vue";
import Icon from "@/components/utility/Icon.vue";

const props = defineProps<{
	emote?: Emote;
	limit?: number;
	editable?: boolean;
	clickable?: boolean;
	batchChanges?: boolean;
}>();

const emit = defineEmits<{
	(e: "update", tags: string[]): void;
}>();

const { t } = useI18n();

const tags = ref<string[]>([]);
const updated = ref(false);

if (props.emote && props.emote.tags?.length) {
	for (const tag of props.emote.tags) {
		tags.value.push(tag);
	}
}

const newTag = ref(false);
const newTagValue = ref("");
const limited = computed(() => props.limit && tags.value.length >= props.limit);

const addTag = () => {
	if (limited.value) {
		return; // max amount of tags added
	}

	const val = newTagValue.value.toLowerCase();
	if (!val || val.length < 3 || tags.value.includes(val)) {
		// can't add duplicate tag
		return;
	}

	tags.value.push(val);
	newTagValue.value = "";
	updated.value = true;

	if (!props.batchChanges) emit("update", tags.value);
};
const removeTag = (v: string) => {
	tags.value = tags.value.filter((tag) => tag !== v);
	updated.value = true;

	if (!props.batchChanges) emit("update", tags.value);
};

const sendBatchUpdate = () => {
	emit("update", tags.value);
	updated.value = false;
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.emote-tag-list {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: center;
	font-size: 0.85rem;

	@include themify() {
		> .tag-chip:not(.tag-add) {
			background-color: lighten(themed("backgroundColor"), 3%);
		}

		> .tag-add {
			div[selector="tag-add-button"] {
				background-color: mix(themed("color"), themed("backgroundColor"), 10%);
			}
		}
		> .tag-save-batch {
			div[selector="tag-add-button"] {
				background-color: themed("accent");
			}
		}
	}

	> .tag-chip {
		display: grid;
		grid-auto-flow: column;
		gap: 0.33em;
		place-items: center;
		border-radius: 0.25em;
		height: 2em;
		width: fit-content;
		margin: 0.25em;
		padding-right: 0.25em;
		padding-left: 0.25em;
		user-select: none;

		> .tag-delete-btn {
			cursor: pointer;
		}
	}

	> .tag-add {
		display: flex;

		div[selector="tag-add-button"] {
			display: grid;
			place-items: center;
			border-radius: 0.25em;

			cursor: pointer;
			width: 2em;
			height: 2em;
		}
	}
}
</style>
