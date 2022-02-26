<template>
	<ModalBase width="32em">
		<template #heading>
			<h3>{{ t("emote_set.select") }}</h3>
		</template>

		<template #content>
			<div class="emote-set-selector">
				<div class="available-sets">
					<div
						v-for="set of editableEmoteSets.values()"
						:key="set.id"
						v-wave="{ duration: 0.3 }"
						:selected="selection.has(set.id)"
						:error="notes.get(set.id)"
						class="card"
						@click="toggleSet(set.id, true)"
						@contextmenu.prevent="toggleSet(actor.defaultEmoteSetID === set.id ? '' : set.id, false)"
					>
						<div>
							<span selector="set-name">
								{{ set.name }}
								<span v-if="notes.has(set.id)" selector="errored"> {{ notes.get(set.id) }} </span>
							</span>
							<span selector="set-owner">
								<UserTag scale="1em" :user="set.owner" />
							</span>
						</div>
						<div>
							<!-- Set As Default -->
							<span
								selector="set-default"
								:selected="defaultEmoteSetID === set.id"
								@click.stop="toggleSet(set.id, false)"
							>
								<Tooltip
									:text="defaultEmoteSetID === set.id ? 'Selected As Default' : 'Select As Default'"
								>
									<font-awesome-icon :icon="['far', 'circle-check']" />
								</Tooltip>
							</span>

							<!-- Checkbox selected indicator -->
							<span v-if="emote" selector="check">
								<Checkbox :checked="selection.has(set.id)" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Change Emote Name In Set -->
		<template v-if="emote && defaultEmoteSetID && selection.has(defaultEmoteSetID)" #footer>
			<div v-if="emote" class="rename-box">
				<span>Rename in {{ defaultEmoteSet?.name }}</span>
				<TextInput v-model="customName" @blur="onRename" @keypress="onRename" />
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import { ref, defineProps, defineEmits, PropType, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Emote } from "@/structures/Emote";
import ModalBase from "./ModalBase.vue";
import UserTag from "../utility/UserTag.vue";
import Checkbox from "../form/Checkbox.vue";
import TextInput from "../form/TextInput.vue";
import Tooltip from "../utility/Tooltip.vue";

const props = defineProps({
	emote: Object as PropType<Emote | null>,
});
const emit = defineEmits(["change"]);
const { t } = useI18n();
const actor = useActorStore();
const { defaultEmoteSetID, defaultEmoteSet, editableEmoteSets } = storeToRefs(actor);
const selection = ref(new Set<string>());

const emote = ref(props.emote ?? null);
const customName = ref(emote.value?.name ?? "");
const notes = ref(new Map<string, string>());

// Set as selected for sets that have the emote
if (emote.value) {
	for (const es of editableEmoteSets.value.values()) {
		if (
			Array.isArray(es.emotes) &&
			es.emotes
				.filter((ae) => ae.id !== emote.value?.id)
				.map((ae) => ae.name)
				.includes(emote.value?.name)
		) {
			notes.value.set(es.id, "CONFLICT");
		}

		if (es.emotes?.filter((ae) => props.emote?.id === ae.id).length) {
			selection.value.add(es.id);
		}
	}
}

const toggleSet = (id: string, update: boolean) => {
	if (notes.value.has(id)) {
		return;
	}
	const set = actor.getEmoteSet(id);
	if (!set) {
		actor.setDefaultEmoteSetID("");
		return;
	}
	// Update the emote name per the set
	if (emote.value) {
		const n = set.emotes.filter((ae) => ae.id == emote.value?.id)[0]?.name;
		customName.value = n || emote.value.name;

		// Send a network request to add/remove the emote
		if (update) {
			notes.value.set(id, "UPDATING");
			const has = selection.value.has(id);
			const changeCb = (/*err: Error | null*/) => {
				notes.value.delete(id);
			};
			if (has) {
				selection.value.delete(id);
				emit("change", "REMOVE", id, changeCb);
			} else {
				selection.value.add(id);
				emit("change", "ADD", id, changeCb);
			}
		}
	}
	actor.setDefaultEmoteSetID(id);
};

onMounted(() => (actor.defaultEmoteSetID ? toggleSet(actor.defaultEmoteSetID, false) : undefined));
const onRename = () => {
	if (!defaultEmoteSetID.value) {
		return;
	}
	const current = defaultEmoteSet.value?.emotes.filter((ae) => emote.value && ae.id === emote.value.id)[0];
	if (!current) {
		throw new Error("emote is not in set");
	}
	if (current.name === customName.value) {
		return; // name wasn't changed.
	}

	// emit event which means the emote's name should be updated
	notes.value.set(defaultEmoteSetID.value, "UPDATING");
	emit(
		"change",
		"UPDATE",
		defaultEmoteSetID.value,
		() => {
			if (!defaultEmoteSetID.value) {
				return;
			}
			notes.value.delete(defaultEmoteSetID.value);
		},
		customName.value
	);
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.modal-content > .emote-set-selector {
	display: flex;
	width: 100%;
	padding: 1em;

	> div.available-sets {
		overflow: auto;
		max-height: 26em;
		display: flex;
		flex-direction: column;
		width: 100%;

		> .card {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: row;
			margin-top: 0.25em;
			margin-bottom: 0.25em;
			padding-top: 0.5em;
			padding-bottom: 0.5em;
			border-radius: 0.3em;
			width: 100%;
			height: 4em;
			@include themify() {
				background-color: darken(themed("backgroundColor"), 4);

				&[selected="true"] {
					background-color: mix(themed("backgroundColor"), themed("primary"), 85%);
				}
				&[error] {
					background-color: transparentize(themed("warning"), 0.785);
				}
				&[error="UPDATING"] {
					background-color: darken(themed("backgroundColor"), 8);
				}
			}

			// Error
			&[error] {
				cursor: not-allowed;
			}
			&[error="UPDATING"] {
				cursor: progress;
			}

			> :nth-child(1) {
				display: flex;
				flex-direction: column;
				margin-left: 0.5em;
				> [selector="set-name"] {
					padding-bottom: 0.25em;

					> [selector="errored"] {
						border-radius: 0.25em;
						padding: 0.15em;
						background-color: rgb(200, 60, 60);
					}
				}
			}
			> :nth-child(2) {
				display: flex;
				align-items: center;
				margin-right: 0.5em;

				> [selector="check"] {
					pointer-events: none;
				}

				> [selector="set-default"] {
					color: rgb(115, 115, 115);
					font-size: 1.5em;
					margin-right: 0.5em;

					&[selected="true"] {
						visibility: visible;
						@include themify() {
							color: themed("accent");
						}
					}
				}
			}
		}
	}
}

.rename-box {
	height: 6em;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	> span {
		color: silver;
		font-size: 0.85em;
		letter-spacing: -0.015rem;
	}
}
</style>
