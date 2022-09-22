<template>
	<ModalBase width="32em" min-height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h2>{{ t("emote_set.properties_prompt.heading", [set.name]) }}</h2>
		</template>

		<template #content>
			<div class="emote-set-properties">
				<TextInput v-model="f$.name.$model" :error="f$.name.$error" :label="t('emote.upload.emote_name')">
					<template v-if="f$.name.$errors.length" #error>
						<span>{{ f$.$errors[0].$message }}</span>
					</template>
				</TextInput>

				<div class="capacity-slider">
					<label>{{ t("emote_set.properties_prompt.capacity", [form.capacity]) }}</label>
					<RangeInput v-model="form.capacity" :min="1" :max="maxSlots" width="12em" />
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
import { useI18n } from "vue-i18n";
import { ModalEvent } from "@/store/modal";
import { computed, reactive } from "vue";
import { helpers } from "@vuelidate/validators";
import { Common } from "@/structures/Common";
import { useActorStore } from "@/store/actor";
import { useVuelidate } from "@vuelidate/core";
import { EmoteSet } from "@/structures/EmoteSet";
import ModalBase from "@/components/modal/ModalBase.vue";
import TextInput from "@/components/form/TextInput.vue";
import RangeInput from "@/components/form/RangeInput.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const props = defineProps<{
	set: EmoteSet;
}>();

const { t } = useI18n();
const actor = useActorStore();

const form = reactive({
	name: props.set.name,
	capacity: props.set.capacity,
});

const formRules = {
	name: {
		required: helpers.withMessage("Invalid Emote Set Name", helpers.regex(Common.RegExp.EMOTE_SET_NAME)),
	},
};

const f$ = useVuelidate(formRules, form);

const maxSlots = computed(() => Math.max(...actor.connections.map((uc) => uc.emote_slots)));
</script>

<style scoped lang="scss">
.emote-set-properties {
	display: grid;
	gap: 1.5em;
	padding: 1em;

	> h4 {
		margin-bottom: 0.5em;
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
