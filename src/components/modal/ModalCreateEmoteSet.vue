<template>
	<ModalBase @close="$emit('close')">
		<template #heading>
			<h3>{{ t("emote_set.create") }}</h3>
		</template>

		<template #content>
			<div class="emote-set-creator">
				<span class="explain">
					<p>{{ t("emote_set.explain.section") }}</p>
					<span>{{ t("emote_set.explain.hint") }}</span>
				</span>
				<div selector="separator" />

				<!-- The form -->
				<form class="form-area">
					<TextInput v-model="nameValue" label="Emote Set Name" />
				</form>

				<!-- Select connections the set should apply to -->
				<div class="connection-selector-area">
					<span class="connection-select-count">
						{{ t("emote_set.modal.selected_channel_count", [connSelectCount]) }}
					</span>
					<ConnectionSelector @select-count="connSelectCount = $event" />
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script lang="ts" setup>
import { PropType, defineProps, defineEmits, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import ModalBase from "./ModalBase.vue";
import TextInput from "../form/TextInput.vue";
import ConnectionSelector from "../utility/ConnectionSelector.vue";

const props = defineProps({
	startingValue: {
		type: Object as PropType<Partial<StartingValue>>,
	},
});
defineEmits(["close"]);
const { t } = useI18n();

// Define form schema
const schema = {
	name() {
		return true;
	},
	connections() {
		return true;
	},
};
useForm({
	validationSchema: schema,
	initialValues: props.startingValue,
});

// Form fields
const { value: nameValue } = useField<string>("name", schema.name);

// Selected connection count
const connSelectCount = ref(0);

interface StartingValue {
	name: string;
	connections: string[];
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
.emote-set-creator {
	display: flex;
	flex-direction: column;
	padding: 1em;

	> span.explain > p {
		text-transform: uppercase;
		letter-spacing: -1px;
		font-weight: 600;
		color: silver;
	}

	> [selector="separator"] {
		width: 100%;
		height: 0.25em;
		margin-top: 1em;
		margin-bottom: 1em;
		@include themify() {
			background-color: mix(themed("color"), themed("backgroundColor"), 5%);
		}
	}

	> form.form-area {
		margin-top: 1.5em;
		margin-bottom: 1.5em;
		max-width: 16em;
	}

	> div.connection-selector-area {
		display: flex;
		flex-direction: column;

		padding: 0.5em;
		width: fit-content;

		@include themify() {
			border-radius: 0.5em;
			background-color: lighten(themed("backgroundColor"), 2);
		}
		> span.connection-select-count {
			text-align: center;
			margin-bottom: 0.5em;
		}
	}
}
</style>
