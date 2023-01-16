<template>
	<ModalBase width="32em" min-height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h2>{{ t("emote.properties_prompt.heading", [emote.name]) }}</h2>
		</template>

		<template #content>
			<div class="emote-properties">
				<TextInput v-model="f$.name.$model" :error="f$.name.$error" :label="t('emote.upload.emote_name')">
					<template v-if="f$.name.$errors.length" #error>
						<span>{{ f$.$errors[0].$message }}</span>
					</template>
				</TextInput>

				<Checkbox v-model="form.private" :checked="form.private" label="Private" />
				<Checkbox v-model="form.zero_width" :checked="form.zero_width" label="Zero-Width" />

				<div v-if="actor.hasPermission(Permissions.EditAnyEmote)">
					<Checkbox v-model="form.listed" :checked="form.listed" label="Listed" />
					<Checkbox v-model="form.personal_use" :checked="form.personal_use" label="Personal Use" />
				</div>
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<div
					v-wave="{ duration: 0.3 }"
					@click="[emit('modal-event', { name: 'update', args: [form] }), emit('close')]"
				>
					{{ t("common.save_changes").toUpperCase() }}
				</div>

				<div v-wave="{ duration: 0.3 }" @click="emit('close')">
					{{ t("common.cancel").toUpperCase() }}
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { useActor } from "@/store/actor";
import { ModalEvent } from "@/store/modal";
import { RegExp } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { Permissions } from "@/structures/Role";
import Checkbox from "@/components/form/Checkbox.vue";
import TextInput from "@/components/form/TextInput.vue";
import ModalBase from "@/components/modal/ModalBase.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const props = defineProps<{
	emote: Emote;
}>();

const { t } = useI18n();
const actor = useActor();

const form = reactive({
	name: props.emote.name,
	private: Emote.IsPrivate(props.emote),
	zero_width: Emote.IsZeroWidth(props.emote),
	listed: props.emote.states.includes("LISTED"),
	personal_use: props.emote.states.includes("PERSONAL"),
});

const formRules = {
	name: {
		required: helpers.withMessage("Invalid Emote Name", helpers.regex(RegExp.EMOTE_NAME)),
	},
};

const f$ = useVuelidate(formRules, form);
</script>

<style scoped lang="scss">
.emote-properties {
	display: grid;
	gap: 1em;
	padding: 1em;

	> h4 {
		margin-bottom: 0.5em;
	}
	> div {
		display: grid;
		gap: 1em;
	}
}

.action-buttons {
	display: flex;
	justify-content: space-between;
	height: 100%;

	> div {
		cursor: pointer;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		place-items: center;
		text-align: center;

		&:nth-child(1) {
			background-color: rgb(30, 120, 45);
		}
	}
}
</style>
