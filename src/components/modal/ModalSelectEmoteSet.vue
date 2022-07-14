<template>
	<ModalBase width="32em" @close="emit('close')">
		<template #heading>
			<h3>{{ t("emote_set.select") }}</h3>
		</template>

		<template #content>
			<div class="emote-set-selector">
				<div class="available-sets">
					<div
						v-for="set of editableEmoteSets.values()"
						:key="set.id"
						:selected="selection.has(set.id)"
						:error="notes.get(set.id)"
						class="card"
						@contextmenu.prevent="toggleSet(actor.defaultEmoteSetID === set.id ? '' : set.id, false)"
					>
						<div v-wave="{ duration: 0.3 }" selector="card-details" @click="toggleSet(set.id, true)">
							<div>
								<span selector="set-name">
									<span>{{ set.name }}</span>

									<!-- Labels -->
									<span selector="label-list">
										<span :class="{ full: set.emotes.length >= set.capacity }" label="capacity">
											{{ set.emotes.length }} / {{ set.capacity }}
										</span>
									</span>
								</span>
								<span selector="set-owner">
									<UserTag scale="0.85em" text-scale="0.85em" :user="set.owner" />
								</span>
							</div>
							<!-- Checkbox selected indicator -->
							<span
								v-if="
									emote &&
									notes.get(set.id) !== 'CONFLICT' &&
									!(!selection.has(set.id) && notes.get(set.id) === 'FULL')
								"
								selector="card-check"
							>
								<Checkbox :checked="selection.has(set.id)" />
							</span>
						</div>

						<div v-wave selector="card-actions">
							<font-awesome-icon size="xl" :icon="['far', 'chevron-down']" />
						</div>
					</div>

					<!-- Create Set Card -->
					<div class="card" @click="createSet">
						<div>
							<span selector="set-name">
								<font-awesome-icon
									size="lg"
									:icon="['far', 'hexagon-plus']"
									:style="{ marginRight: '0.5em' }"
								/>
								<span> {{ t("emote_set.create") }} </span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Change Emote Name In Set -->
		<template
			v-if="emote && defaultEmoteSetID && (selection.has(defaultEmoteSetID) || notes.has(defaultEmoteSetID))"
			#footer
		>
			<div v-if="emote" class="rename-box" :conflict="notes.get(defaultEmoteSetID as string) === 'CONFLICT'">
				<span>Rename in {{ defaultEmoteSet?.name }}</span>
				<TextInput v-model="customName" @blur="onRename" @keypress.enter="onRename" />
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useActorStore } from "@store/actor";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animate } from "motion";
import { Emote } from "@structures/Emote";
import { ModalEvent, useModal } from "@store/modal";
import ModalBase from "@components/modal/ModalBase.vue";
import UserTag from "@components/utility/UserTag.vue";
import Checkbox from "@components/form/Checkbox.vue";
import TextInput from "@components/form/TextInput.vue";
import ModalCreateEmoteSetVue from "@components/modal/ModalCreateEmoteSet.vue";

const { t } = useI18n();

const props = defineProps<{ emote: Emote | null }>();
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const actor = useActorStore();
const { defaultEmoteSetID, defaultEmoteSet, editableEmoteSets } = storeToRefs(actor);
const selection = ref(new Set<string>());

const emote = ref(props.emote ?? null);
const notes = ref(new Map<string, string>());

// Rename form
const customName = ref(emote.value?.name ?? "");

// "Create Emote Set" button
const modal = useModal();
const createSet = () =>
	modal.open("create-set", {
		component: ModalCreateEmoteSetVue,
		props: { startingValue: { name: `${actor.user?.display_name}'s Emotes` } },
		events: {},
	});

// Set as selected for sets that have the emote
const updateStates = () => {
	if (!emote.value) {
		return;
	}
	for (const es of editableEmoteSets.value.values()) {
		if (
			Array.isArray(es.emotes) &&
			!actor.getActiveEmoteInSet(es.id, emote.value.id) &&
			actor.getActiveEmoteInSetByName(es.id, emote.value.name)
		) {
			notes.value.set(es.id, "CONFLICT");
		}

		if (Array.isArray(es.emotes) && es.emotes.length >= es.capacity) {
			notes.value.set(es.id, "FULL");
		}

		if (es.emotes?.filter((ae) => props.emote?.id === ae.id).length) {
			selection.value.add(es.id);
		}
	}
};
updateStates();

const toggleSet = (id: string, update: boolean) => {
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
		if (update && notes.value.get(id) !== "CONFLICT") {
			const isFull = notes.value.get(id) === "FULL" && !actor.getActiveEmoteInSet(id, emote.value.id);
			if (!isFull) {
				notes.value.set(id, "UPDATING");
				const has = selection.value.has(id);
				const changeCb = (/*err: Error | null*/) => {
					notes.value.delete(id);
					updateStates();
				};
				if (has) {
					selection.value.delete(id);
					emit("modal-event", { name: "change", args: ["REMOVE", id, changeCb] });
				} else {
					selection.value.add(id);
					emit("modal-event", { name: "change", args: ["ADD", id, changeCb] });
				}
			}
		}
	}
	actor.setDefaultEmoteSetID(id);

	// Highlight the rename area if there is a naming conflict
	if (notes.value.get(id) === "CONFLICT") {
		setTimeout(() => {
			const { cancel, finished } = animate(
				".rename-box",
				{ backgroundColor: ["inherit", "red", "inherit"] },
				{ duration: 0.85, repeat: 1 },
			);
			const stopWatch = watch(customName, () => [cancel(), stopWatch()]) as () => void;
			finished.then(() => stopWatch());
		}, 0);
	}
};

onMounted(() => (actor.defaultEmoteSetID ? toggleSet(actor.defaultEmoteSetID, false) : undefined));
const onRename = () => {
	if (!defaultEmoteSetID.value) {
		return;
	}
	const current = defaultEmoteSet.value?.emotes.filter((ae) => emote.value && ae.id === emote.value.id)[0];
	if (current && current.name === customName.value) {
		return; // name wasn't changed.
	}

	// emit event which means the emote's name should be updated
	notes.value.set(defaultEmoteSetID.value, "UPDATING");
	const op = current ? "UPDATE" : "ADD";
	emit("modal-event", {
		name: "change",
		args: [
			op,
			defaultEmoteSetID.value,
			() => {
				if (!defaultEmoteSetID.value) {
					return;
				}
				notes.value.delete(defaultEmoteSetID.value);
				if (op === "ADD") {
					selection.value.add(defaultEmoteSetID.value);
				}
			},
			customName.value,
		],
	});
};
</script>

<style lang="scss" data-style-group="modal">
@import "@scss/themes.scss";

.modal-content {
	display: none;
}

.modal-content > .emote-set-selector {
	width: 100%;
	padding: 1em;

	> div.available-sets {
		overflow: auto;
		max-height: 26em;
		display: flex;
		flex-direction: column;

		> .card {
			display: flex;
			cursor: pointer;
			margin-top: 0.25em;
			margin-bottom: 0.25em;
			border-radius: 0.3em;

			@include themify() {
				> div[selector="card-details"] {
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

					> div > span[selector="set-name"] > span[selector="label-list"] {
						> span[label] {
							background-color: themed("backgroundColor");
						}
						> span.full[label="capacity"] {
							background-color: themed("warning");
						}
					}
				}
				> div[selector="card-actions"] {
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: darken(themed("backgroundColor"), 4);
				}
			}

			> [selector="card-details"] {
				display: flex;
				flex-direction: row;
				flex-grow: 1;
				align-items: center;
				justify-content: space-between;
				padding: 0.5em;

				> div {
					display: flex;
					flex-direction: column;

					> span[selector="set-name"] {
						font-size: 0.85em;

						> span[selector="label-list"] {
							margin-left: 0.5em;

							> span[label] {
								padding: 0.25em;
								border-radius: 0.35em;
							}
						}
					}
					> [selector="set-owner"] {
						margin-top: 0.5em;
						margin-left: 0.15em;
					}
				}

				> span[selector="card-check"] {
					margin-right: 0.25em;
				}
			}
			> [selector="card-actions"] {
				margin-left: 0.25em;
				margin-right: 0.5em;
				width: 3.5em;

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
	padding: 1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> span {
		color: silver;
		font-size: 0.85em;
		letter-spacing: -0.015rem;
	}
}
</style>
