<template>
	<ModalBase width="32em" min-height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h2>{{ t("emote_set.properties_prompt.heading", [set.name]) }}</h2>
		</template>

		<template #content>
			<div class="emote-set-properties">
				<!-- Name -->
				<TextInput v-model="f$.name.$model" :error="f$.name.$error" :label="t('emote.upload.emote_name')">
					<template v-if="f$.name.$errors.length" #error>
						<span>{{ f$.$errors[0].$message }}</span>
					</template>
				</TextInput>

				<!-- Capacity -->
				<div class="capacity-slider">
					<label>{{ t("emote_set.properties_prompt.capacity", [form.capacity]) }}</label>
					<RangeInput v-model="form.capacity" :min="1" :max="maxSlots" width="12em" />
				</div>

				<!-- Assigned Connection(s) -->
				<ConnectionSelector
					:user="set.owner"
					:starting-value="form.connections"
					@update="form.connections = $event"
				/>
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
import { computed, reactive, ref, toRef } from "vue";
import { EmoteSet } from "@/structures/EmoteSet";
import { GetUserEmoteSets } from "@/assets/gql/users/user";
import { helpers } from "@vuelidate/validators";
import { ModalEvent } from "@/store/modal";
import { RegExp } from "@/structures/Common";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { useVuelidate } from "@vuelidate/core";
import ModalBase from "@/components/modal/ModalBase.vue";
import RangeInput from "@/components/form/RangeInput.vue";
import TextInput from "@/components/form/TextInput.vue";
import ConnectionSelector from "@/components/utility/ConnectionSelector.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const props = defineProps<{
	set: EmoteSet;
}>();

const { t } = useI18n();
const set = toRef(props, "set");
const sets = ref<EmoteSet[]>();

const { onResult } = useQuery(GetUserEmoteSets, { id: set.value.owner.id });
onResult((result) => {
	sets.value = result.data?.user.emoteSets ?? [];
});

const form = reactive({
	name: props.set.name,
	capacity: props.set.capacity,
	connections: set.value.owner.connections?.filter((uc) => uc.emote_set_id === set.value.id).map((uc) => uc.id) ?? [],
});

const formRules = {
	name: {
		required: helpers.withMessage("Invalid Emote Set Name", helpers.regex(RegExp.EMOTE_SET_NAME)),
	},
};

const f$ = useVuelidate(formRules, form);

const maxSlots = computed(() => Math.max(...props.set.owner.connections.map((uc) => uc.emote_capacity)));
</script>

<style scoped lang="scss">
.emote-set-properties {
	display: grid;
	row-gap: 1em;
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
