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
				<div class="connection-select">
					<p>{{ t("emote_set.properties_prompt.assign_to_channel") }}</p>
					<ConnectionSelector
						:user="set.owner"
						:starting-value="form.connections ?? []"
						@update="form.connections = $event"
					/>
				</div>

				<EmoteSetOrigins :set="set" @update="form.origins = $event" />
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<div v-wave="{ duration: 0.3 }" @click="doMutation(form)">
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
import { GetUserEmoteSets } from "@/assets/gql/users/user";
import { helpers } from "@vuelidate/validators";
import { ModalEvent } from "@/store/modal";
import { RegExp } from "@/structures/Common";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { useVuelidate } from "@vuelidate/core";
import { useMutationStore } from "@/store/mutation";
import type { EmoteSet, EmoteSetOrigin } from "@/structures/EmoteSet";
import type { UpdateEmoteSet } from "@/assets/gql/mutation/EmoteSet";
import type { FetchResult } from "@apollo/client";
import EmoteSetOrigins from "@/components/emote-set/EmoteSetOrigins.vue";
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
	connections: null as null | string[],
	origins: null as null | EmoteSetOrigin[],
});

const formRules = {
	name: {
		required: helpers.withMessage("Invalid Emote Set Name", helpers.regex(RegExp.EMOTE_SET_NAME)),
	},
};

const f$ = useVuelidate(formRules, form);

const maxSlots = computed(() => Math.max(...props.set.owner.connections.map((uc) => uc.emote_capacity)));

const m = useMutationStore();
const doMutation = async (
	data: UpdateEmoteSet.Variables["data"] & { connections?: null | string[]; origins: null | EmoteSetOrigin[] },
) => {
	// Bind the connection(s) to the set
	const wg = [] as Promise<FetchResult<object, Record<string, object>, Record<string, object>> | null>[];
	for (const connID of data.connections ?? []) {
		wg.push(
			m.editUserConnection(set.value.owner.id, connID, {
				emote_set_id: set.value.id,
			}),
		);
	}
	await Promise.allSettled(wg);

	delete data.connections;
	m.editEmoteSet(set.value.id, data);

	emit("close");
};
</script>

<style scoped lang="scss">
.emote-set-properties {
	display: grid;
	row-gap: 1em;
	padding: 1em;

	> h4 {
		margin-bottom: 0.5em;
	}

	.connection-select {
		display: grid;
		row-gap: 0.25em;
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
