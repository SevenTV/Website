<template>
	<ModalBase width="36em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h3>{{ t("emote_set.create") }}</h3>
		</template>

		<template #content>
			<div class="emote-set-creator">
				<div>
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
							{{ t("emote_set.modal.selected_channel_count", [connections.length], connections.length) }}
						</span>
						<ConnectionSelector :starting-value="startingConnections" @update="connections = $event" />
					</div>
				</div>

				<h3 v-if="error" selector="error">{{ error }}</h3>
			</div>
		</template>

		<template #footer>
			<div v-wave="{ duration: 0.3 }" selector="submit-button" :disabled="loading" @click="doCreate">
				<span> {{ t("emote_set.modal.create_button") }} </span>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import { useMutationStore } from "@/store/mutation";
import { FetchResult } from "@apollo/client/core";
import { ModalEvent } from "@/store/modal";
import ModalBase from "./ModalBase.vue";
import TextInput from "@components/form/TextInput.vue";
import ConnectionSelector from "@components/utility/ConnectionSelector.vue";

interface StartingValue {
	name: string;
	connections: string[];
}

const props = defineProps({
	startingValue: {
		type: Object as PropType<Partial<StartingValue>>,
	},
});
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();
const { t } = useI18n();

const actor = useActorStore();
const { user: actorUser } = storeToRefs(actor);

// Form fields
const error = ref<string | null>(null);
const connections = ref([] as string[]);
const nameValue = ref(props.startingValue?.name ?? "");

// Selected connection count
const startingConnections = ref([] as string[]);

// Tick all connections by default if none were passed
if (!props.startingValue?.connections?.length) {
	actorUser.value?.connections.forEach((uc) => startingConnections.value.push(uc.id));
}

// Handle submit
const loading = ref(false);
const m = useMutationStore();
const doCreate = async () => {
	if (loading.value) {
		return;
	}
	loading.value = true;
	error.value = null;
	// Create the emote set
	const set = await m
		.createEmoteSet(nameValue.value)
		.then((res) => res?.data?.createEmoteSet ?? null)
		.catch((err) => {
			error.value = err.message;
		})
		.finally(() => {
			loading.value = false;
		});
	if (!set) {
		return;
	}

	// Bind the connection(s) to the set
	const wg = [] as Promise<FetchResult<object, Record<string, object>, Record<string, object>> | null>[];
	for (const connID of connections.value) {
		wg.push(
			m.editUserConnection(actor.user?.id as string, connID, {
				emote_set_id: set.id,
			}),
		);
	}
	await Promise.allSettled(wg);

	emit("modal-event", { name: "created", args: [set] });
	emit("close");
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
.emote-set-creator {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1em;

	> span.explain > p {
		text-transform: uppercase;
		letter-spacing: -1px;
		font-weight: 600;
		color: silver;
	}

	> :nth-child(1) {
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

	[selector="error"] {
		color: red;
		text-align: center;
	}
}

[selector="submit-button"] {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	user-select: none;
	height: 100%;
	@include themify() {
		background-color: themed("primary");
	}

	> span {
		font-size: 1.5em;
		letter-spacing: 0.15em;
	}

	&[disabled="true"] {
		pointer-events: none;
		filter: grayscale(75);
	}
}
</style>
