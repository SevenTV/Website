<template>
	<div class="emote-set-origins">
		<p>
			{{ t("emote_set.origins.title") }}
			<label v-tooltip="t('common.experimental_hint')" class="experimental-label">{{
				t("common.experimental")
			}}</label>
		</p>
		<span>{{ t("emote_set.origins.hint", [set.name]) }}</span>

		<div class="origins-form">
			<div v-for="(x, index) of form" :key="x.id" class="origin-item">
				<Dropdown
					:options="options"
					:default-value="options.find((v) => x.id === v.id)"
					:tabindex="1"
					max-height="7.5em"
					@update:model-value="(id) => updateOrigin(index, id)"
				/>
				<Icon icon="trash" @click="delOrigin(index)" />
			</div>

			<Button
				:disabled="formLength >= 3"
				:label="t('emote_set.origins.new')"
				appearance="raised"
				color="primary"
				@click="addOrigin"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import { EmoteSet, EmoteSetOrigin } from "@/structures/EmoteSet";
import Dropdown from "../form/Dropdown.vue";
import Button from "../utility/Button.vue";
import Icon from "../utility/Icon.vue";

const props = defineProps<{
	set: EmoteSet;
}>();

const emit = defineEmits<{
	(e: "update", origins: EmoteSetOrigin[]): void;
}>();

const set = toRef(props, "set");
const { t } = useI18n();
const actor = useActor();
const { editableEmoteSets } = storeToRefs(actor);

const options = computed(() =>
	Object.values(editableEmoteSets.value)
		.filter((es) => es.id !== set.value.id)
		.map((es) => ({
			id: es.id,
			name: es.name,
		})),
);

const form = ref<EmoteSetOrigin[]>([]);
const formLength = computed(() => Object.keys(form.value).length);

form.value = set.value.origins;

const addOrigin = () => {
	const at = Object.keys(form.value).length;
	const opt = options.value[at];

	form.value[at] = {
		id: opt.id,
		weight: 0,
	};
	emit("update", Object.values(form.value));
};

const updateOrigin = (i: number, id: string) => {
	form.value.splice(i, 1, {
		id,
		weight: 0,
	});

	emit("update", Object.values(form.value));
};

const delOrigin = (i: number) => {
	form.value.splice(i, 1);

	emit("update", Object.values(form.value));
};
</script>

<style scoped lang="scss">
@import "@scss/common/shape.scss";

.emote-set-origins {
	margin-bottom: 1em;

	> p > label.experimental-label {
		margin-left: 0.5em;
		color: rgb(255, 100, 100);
		background-color: rgb(0, 0, 0);
		padding: 0.1em 0.5em;
		clip-path: createbevel(0.25em);
	}
	> span:nth-of-type(1) {
		font-size: 0.75rem;
	}

	.origins-form {
		margin-top: 0.5em;
		width: fit-content;

		.origin-item {
			display: flex;
			margin-bottom: 0.25em;
			align-items: center;
			column-gap: 1em;

			.dropdown {
				width: 15em;
			}
		}
	}
}
</style>
