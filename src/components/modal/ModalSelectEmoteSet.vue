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
							<span
								v-if="
									emote &&
									notes.get(set.id) !== 'CONFLICT' &&
									!(!selection.has(set.id) && notes.get(set.id) === 'FULL')
								"
								selector="check"
							>
								<Checkbox :checked="selection.has(set.id)" />
							</span>
						</div>
					</div>
					<!-- Create Set Card -->
					<div class="card" @click="createSet">
						<div>
							<span selector="set-name">
								<font-awesome-icon :icon="['fas', 'plus']" :style="{ marginRight: '0.5em' }" />
								<span>Create Emote Set</span>
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
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import { animate } from "motion";
import { Emote } from "@/structures/Emote";
import { ModalEvent, useModal } from "@/store/modal";

const ModalBase = defineAsyncComponent(() => import("./ModalBase.vue"));
const UserTag = defineAsyncComponent(() => import("../utility/UserTag.vue"));
const Checkbox = defineAsyncComponent(() => import("../form/Checkbox.vue"));
const TextInput = defineAsyncComponent(() => import("../form/TextInput.vue"));
const Tooltip = defineAsyncComponent(() => import("../utility/Tooltip.vue"));
const ModalCreateEmoteSetVue = defineAsyncComponent(() => import("./ModalCreateEmoteSet.vue"));

const props = defineProps<{ emote: Emote | null }>();
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const { t } = useI18n();

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

		if (Array.isArray(es.emotes) && es.emotes.length >= es.emote_slots) {
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
