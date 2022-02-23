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

				<div class="form-area">
					<TextInput v-model="nameValue" label="Emote Set Name" />
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import ModalBase from "./ModalBase.vue";
import TextInput from "../form/TextInput.vue";

export default defineComponent({
	components: { ModalBase, TextInput },
	props: {
		startingValue: {
			type: Object as PropType<Partial<StartingValue>>,
		},
	},
	emits: ["close"],
	setup(props) {
		const { t } = useI18n();
		const schema = {
			name() {
				return true;
			},
		};
		useForm({
			validationSchema: schema,
			initialValues: props.startingValue,
		});

		const { value: nameValue } = useField<string>("name", schema.name);

		return {
			nameValue,
			t,
		};
	},
});

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

	> div.form-area {
		margin-top: 1.5em;
		max-width: 16em;
	}
}
</style>
