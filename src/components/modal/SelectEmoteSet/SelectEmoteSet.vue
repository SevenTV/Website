<template>
	<ModalBase width="32em" @close="shouldClose">
		<template #heading>
			<h3>{{ t("emote_set.select") }}</h3>
		</template>

		<template #content>
			<div class="emote-set-selector">
				<div class="available-sets">
					<div
						v-for="set of editableEmoteSets.values()"
						:key="set.id"
						class="card"
						@contextmenu.prevent="toggleSet(actor.defaultEmoteSetID === set.id ? '' : set.id, false)"
					>
						<!-- Set Details (name, owner) -->
						<div
							v-wave="{ duration: 0.3 }"
							:selected="selection.has(set.id)"
							:error="notes.get(set.id)"
							selector="card-details"
							@click="toggleSet(set.id, true)"
						>
							<div>
								<span selector="set-name">
									<span>{{ set.name }}</span>

									<!-- Labels -->
									<span selector="label-list">
										<!-- Capacity -->
										<span
											v-if="set.emotes"
											:class="{ full: set.emotes.length >= set.capacity }"
											label="capacity"
										>
											{{ set.emotes.length }} / {{ set.capacity }}
										</span>

										<!-- Emote Renamed-->
										<span
											v-if="emote && emote.name !== getActiveEmoteName(set.id, emote.id)"
											label="renamed"
										>
											{{ t("emote_set.label_renamed").toUpperCase() }}
										</span>

										<span v-if="notes.get(set.id) === 'CONFLICT'" label="conflict">
											{{ t("emote_set.label_conflict").toUpperCase() }}
										</span>

										<!-- Default Set -->
										<span v-if="defaultEmoteSetID === set.id" label="default-set">
											{{ t("emote_set.label_default").toUpperCase() }}
										</span>
									</span>
								</span>
								<span selector="set-owner">
									<UserTag scale="0.85em" text-scale="0.85em" :user="set.owner" />
								</span>
							</div>

							<!-- Checkbox selected indicator -->
							<span v-if="emote && !notes.get(set.id)" selector="card-check">
								<Checkbox :checked="selection.has(set.id)" />
							</span>
						</div>

						<!-- Context Menu Button -->
						<div selector="card-actions" @click="(ev) => openContext(ev, set)">
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
		<template v-if="contextMenu.mode === 'rename'" #footer>
			<div v-if="emote" class="rename-box" :conflict="notes.get(contextMenu.set?.id as string) === 'CONFLICT'">
				<span> {{ t("emote_set.modal.rename_in_set", [contextMenu.set?.name]) }} </span>
				<TextInput
					v-model="customName"
					:autofocus="true"
					@blur="onRename(contextMenu.set)"
					@keypress.enter="onRename(contextMenu.set)"
				/>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useActorStore } from "@store/actor";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch, inject, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { animate } from "motion";
import { Emote } from "@structures/Emote";
import { ModalEvent, useModal } from "@store/modal";
import { ContextMenuFunction } from "@/context-menu";
import ModalBase from "@components/modal/ModalBase.vue";
import UserTag from "@components/utility/UserTag.vue";
import Checkbox from "@components/form/Checkbox.vue";
import TextInput from "@components/form/TextInput.vue";
import ModalCreateEmoteSet from "@components/modal/ModalCreateEmoteSet.vue";
import SelectEmoteSetContext from "./SelectEmoteSetContext.vue";
import { EmoteSet } from "@/structures/EmoteSet";

const { t } = useI18n();

const props = defineProps<{ emote: Emote | null }>();
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const actor = useActorStore();
const { defaultEmoteSetID, editableEmoteSets } = storeToRefs(actor);
const selection = ref(new Set<string>());

const emote = ref(props.emote ?? null);
const notes = ref(new Map<string, string>());

// Rename form
const customName = ref(emote.value?.name ?? "");

// "Create Emote Set" button
const modal = useModal();
const createSet = () =>
	modal.open("create-set", {
		component: ModalCreateEmoteSet,
		props: { startingValue: { name: `${actor.user?.display_name}'s Emotes` } },
		events: {},
	});

// Set up context menu
const contextMenu = reactive({
	open: false,
	set: null as EmoteSet | null,
	mode: "",
});
const ctxMenuUtil = inject<ContextMenuFunction>("ContextMenu");
const openContext = (ev: MouseEvent, set: EmoteSet) => {
	if (typeof ctxMenuUtil !== "function") {
		return;
	}

	contextMenu.open = true;
	contextMenu.set = set;
	contextMenu.mode = "";
	ctxMenuUtil(ev, SelectEmoteSetContext, { emote: emote.value, set }).then((v) => {
		if (!v) {
			return;
		}

		// Handle context click
		switch (v) {
			case "rename": // User wants to rename the emote in this set
				contextMenu.mode = "rename";
				break;
		}

		contextMenu.open = false;
	});
};

const shouldClose = () => {
	if (contextMenu.open) {
		return;
	}

	emit("close");
};

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

const getActiveEmoteName = (setID: string, emoteID: string): string => {
	return actor.getActiveEmoteInSet(setID, emoteID)?.name ?? emote.value?.name ?? "";
};

const toggleSet = (id: string, update: boolean) => {
	const set = actor.getEmoteSet(id);
	if (!set) {
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

	// Highlight the rename area if there is a naming conflict
	if (notes.value.get(id) === "CONFLICT") {
		contextMenu.mode = "rename";
		contextMenu.set = set;

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
const onRename = (set: EmoteSet | null) => {
	if (!set) {
		return;
	}
	const current = getActiveEmoteName(set.id, emote.value?.id as string);
	if (current && current === customName.value) {
		return; // name wasn't changed.
	}

	contextMenu.mode = "";
	contextMenu.set = null;

	// emit event which means the emote's name should be updated
	notes.value.set(set.id, "UPDATING");
	const op = actor.getActiveEmoteInSet(set.id, emote.value?.id as string) ? "UPDATE" : "ADD";
	emit("modal-event", {
		name: "change",
		args: [
			op,
			set.id,
			() => {
				if (!set) {
					return;
				}
				notes.value.delete(set.id);
				if (op === "ADD") {
					selection.value.add(set.id);
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
	height: 29em;
	padding: 0.5em;

	> div.available-sets {
		overflow: auto;
		display: flex;
		height: 100%;
		flex-direction: column;

		> .card {
			display: flex;
			cursor: pointer;
			margin-top: 0.25em;
			margin-bottom: 0.25em;

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
						> span[label="default-set"] {
							background-color: mix(themed("backgroundColor"), themed("accent"), 45%);
						}
						> span[label="renamed"] {
							color: rgb(128, 128, 128);
						}
						> span[label="conflict"] {
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
				border-radius: 0.25em;

				> div {
					display: flex;
					flex-direction: column;

					> span[selector="set-name"] {
						font-size: 0.85em;

						> span[selector="label-list"] {
							margin-left: 0.5em;

							> span[label] {
								margin: 0.1em;
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
				border-radius: 0.25em;

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
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 1em;

	> span {
		color: silver;
		font-size: 0.85em;
		letter-spacing: -0.015rem;
	}
}
</style>
