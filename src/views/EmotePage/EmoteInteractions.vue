<template>
	<div class="actions-wrapper">
		<!-- Main buttons -->
		<Transition name="button-slide" mode="out-in" @before-leave="sliding = true" @before-enter="sliding = false">
			<div v-if="!moreButtons" class="action-group">
				<!-- BUTTON: Unlisted, allow showing the emote -->
				<div v-if="unlisted" v-wave class="action-button" name="show-content" @click="emit('unlisted-show')">
					<span class="action-icon">
						<font-awesome-icon size="lg" :icon="['far', 'eye']" />
					</span>
					<span> {{ t("emote.unlisted.show_button").toUpperCase() }} </span>
				</div>

				<!-- BUTTON: USE EMOTE -->
				<div
					v-if="
						(!available && hasEmote) ||
						(!unlisted && User.HasPermission(clientUser, Permissions.EditEmoteSet))
					"
					v-wave
					:in-channel="hasEmote"
					:other-version-active="!hasEmote && hasOtherVersion"
					:disabled="loading || (!hasEmote && slotsFull)"
					class="action-button"
					name="set-select"
					@click="setEmote(defaultEmoteSet?.id, hasEmote ? 'REMOVE' : hasOtherVersion ? 'SWITCH' : 'ADD')"
				>
					<span class="action-icon">
						<font-awesome-icon size="lg" :icon="['far', hasEmote ? 'minus' : 'hexagon-plus']" />
					</span>
					<span v-if="slotsFull && !hasEmote && !hasOtherVersion">
						{{ t("emote_set.no_space").toUpperCase() }}
					</span>
					<span v-else-if="!hasEmote && hasOtherVersion">{{ t("emote.switch_version").toUpperCase() }}</span>
					<span v-else> {{ (hasEmote ? t("emote.disable") : t("emote.use")).toUpperCase() }} </span>
					<div class="separator" />
					<div class="extended-interact" @click.stop="openSetSelector">
						<font-awesome-icon size="lg" selector="icon" :icon="['far', 'ellipsis-h']" />
					</div>
				</div>
				<div class="use-emote-note">
					<span v-if="defaultEmoteSet">
						<p>{{ t("emote_set.editing", [defaultEmoteSet.name]) }}</p>
						<span v-if="defaultEmoteSet.owner && clientUser && defaultEmoteSet.owner.id !== clientUser.id">
							<i18n-t keypath="emote_set.owner" tag="span">
								<template #USER>
									<span style="display: inline-block">
										<UserTag :hide-avatar="true" :user="defaultEmoteSet.owner" />
									</span>
								</template>
							</i18n-t>
						</span>
						<span v-else class="as-self"> {{ t("emote_set.owned") }} </span>
					</span>
					<span v-else> ({{ t("emote_set.none_selected") }}) </span>
				</div>

				<!-- BUTTON: UPDATE -->
				<router-link
					v-if="canEditEmote && available"
					v-wave
					:to="{
						name: 'EmoteUpload',
						query: { parentID: emote?.id },
						params: { parentData: JSON.stringify(emote) },
					}"
					class="action-button unstyled-link"
					name="update"
				>
					<span class="action-icon">
						<font-awesome-icon size="lg" :icon="['far', 'pen']"></font-awesome-icon>
					</span>
					<span>{{ t("common.update").toUpperCase() }}</span>
				</router-link>

				<!-- BUTTON: REPORT -->
				<div
					v-if="available && (!actor.id || User.HasPermission(clientUser, Permissions.CreateReport))"
					ref="reportTrigger"
					v-wave
					class="action-button"
					name="report"
					@click="reportPromptVisible = !reportPromptVisible"
				>
					<span class="action-icon">
						<font-awesome-icon size="lg" :icon="['far', 'flag']" />
					</span>
					<span>{{ t("common.report").toUpperCase() }}</span>
				</div>
			</div>

			<!-- Extended buttons -->
			<div v-else-if="available" class="action-group">
				<!-- BUTTON: DELETE -->
				<Tooltip :text="t('common.download')">
					<div
						v-if="actor.id === emote?.owner_id || actor.hasPermission(Permissions.EditAnyEmote)"
						v-wave
						class="action-button"
						name="download"
					>
						<span class="action-icon">
							<font-awesome-icon size="lg" :icon="['far', 'download']" />
						</span>
					</div>
				</Tooltip>

				<!-- BUTTON: DELETE -->
				<div
					v-if="actor.id === emote?.owner_id || actor.hasPermission(Permissions.EditAnyEmote)"
					v-wave
					class="action-button"
					name="delete"
					@click="deleteEmote"
				>
					<span class="action-icon">
						<font-awesome-icon size="lg" :icon="['far', 'trash']" />
					</span>
					<span>{{ t("common.delete").toUpperCase() }}</span>
				</div>
			</div>
		</Transition>

		<Transition name="fade" mode="out-in">
			<div v-if="available && !sliding" class="action-group">
				<!-- BUTTON: MORE -->
				<div v-wave class="action-button" name="more" @click="moreButtons = !moreButtons">
					<span class="action-icon">
						<font-awesome-icon size="lg" :icon="['far', moreButtons ? 'chevrons-right' : 'ellipsis-v']" />
					</span>
					<span>
						{{ (moreButtons ? t("common.back") : t("common.more")).toUpperCase() }}
					</span>
				</div>
			</div>
		</Transition>

		<!-- Report Prompt -->
		<div ref="reportPopper" :style="{ position: 'absolute', zIndex: 5 }">
			<ReportForm
				v-if="reportPromptVisible"
				:target="emote"
				:kind="Common.ObjectKind.EMOTE"
				@close="reportPromptVisible = false"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref, computed } from "vue";
import { User } from "@structures/User";
import { Emote } from "@structures/Emote";
import { useActorStore } from "@store/actor";
import { storeToRefs } from "pinia";
import { createPopper } from "@popperjs/core";
import { useMutationStore } from "@store/mutation";
import { Permissions } from "@structures/Role";
import { Common } from "@structures/Common";
import { useModal } from "@store/modal";
import { useI18n } from "vue-i18n";
import ReportForm from "@components/utility/ReportForm.vue";
import ModalCreateEmoteSet from "@components/modal/ModalCreateEmoteSet.vue";
import ModalSelectEmoteSet from "@components/modal/SelectEmoteSet/SelectEmoteSet.vue";
import UserTag from "@components/utility/UserTag.vue";
import EmoteDeleteModal from "./EmoteDeleteModal.vue";
import Tooltip from "@/components/utility/Tooltip.vue";

const { t } = useI18n();

const props = defineProps({
	emote: {
		type: Object as PropType<Emote | null>,
		required: true,
	},
	unlisted: {
		type: Boolean,
		required: false,
	},
});

const emit = defineEmits<{
	(e: "unlisted-show"): void;
}>();

const modal = useModal();
const actor = useActorStore();
const { user: clientUser, activeEmotes, editableEmoteSets, defaultEmoteSet, defaultEmoteSetID } = storeToRefs(actor);
const canEditEmote = computed(
	() =>
		clientUser.value &&
		(props.emote?.owner?.id === clientUser.value.id ||
			User.HasPermission(clientUser.value, Permissions.EditAnyEmote)),
);

// Set up report button & prompt
const reportTrigger = ref<(HTMLElement & { open: boolean }) | null>(null);
const reportPopper = ref<HTMLElement | null>(null);
const reportPromptVisible = ref(false);
onMounted(() => {
	if (!reportTrigger.value || !reportPopper.value) {
		return;
	}
	createPopper(reportTrigger.value as HTMLElement, reportPopper.value as HTMLElement);
});

// Emote state
const hasEmote = computed(() => activeEmotes.value.has(props.emote?.id as string));
const hasOtherVersion = computed(() => otherVersions.value.length > 0);
const otherVersions = computed(
	() => props.emote?.versions?.filter((ver) => activeEmotes.value.has(ver.id) && ver.id !== props.emote?.id) ?? [],
);
const available = computed(() => props.emote && props.emote.lifecycle === Emote.Lifecycle.LIVE);

const isNameConflict = computed(
	() =>
		props.emote &&
		defaultEmoteSetID.value &&
		!actor.getActiveEmoteInSet(defaultEmoteSetID.value, props.emote.id) &&
		actor.getActiveEmoteInSetByName(defaultEmoteSetID.value, props.emote.name),
);
const slotsFull = computed(
	() => defaultEmoteSet.value && defaultEmoteSet.value.emotes?.length >= defaultEmoteSet.value.capacity,
);

// What content to show
const moreButtons = ref(false);
const sliding = ref(false);

// Mutation
const loading = ref(false);
const m = useMutationStore();

const setEmote = async (
	setID: string | undefined,
	action: Common.ListItemAction | "SWITCH",
	name?: string,
	skipModal?: boolean,
) => {
	// SWITCH is special case where another version of the emoter is active
	if (action === "SWITCH" && setID && props.emote) {
		// Disable other version(s)
		loading.value = true;
		const wg = [] as Promise<unknown>[];
		for (const ver of otherVersions.value ?? []) {
			wg.push(m.setEmoteInSet(setID, "REMOVE", ver.id));
		}
		await Promise.allSettled(wg); // wait for all removals to be done
		return m.setEmoteInSet(setID, "ADD", props.emote.id).finally(() => (loading.value = false));
	}

	if (
		!setID ||
		!props.emote ||
		(!actor.getActiveEmoteInSet(setID, props.emote.id) && actor.isEmoteSetFull(setID)) ||
		(!otherVersions.value?.length && !name && isNameConflict.value && !skipModal)
	) {
		if (clientUser.value && !editableEmoteSets.value.size) {
			modal.open("create-set", {
				component: ModalCreateEmoteSet,
				props: { startingValue: { name: `${clientUser.value.display_name}'s Emotes` } },
				events: {},
			});
		} else {
			openSetSelector();
		}
		return;
	}
	loading.value = true;
	// Do normal action (add, update or remove emote)
	return m
		.setEmoteInSet(setID, action as Common.ListItemAction, props.emote.id, name)
		.catch((err) => actor.showErrorModal(err))
		.finally(() => (loading.value = false));
};
const openSetSelector = () =>
	modal.open("select-set", {
		component: ModalSelectEmoteSet,
		props: { emote: props.emote },
		events: {
			change: (a, b, c, d) => onModalSetEmote(a, b, c, d),
		},
	});
const onModalSetEmote = (a: Common.ListItemAction, id: string, cb: (err: Error | null) => void, name?: string) => {
	setEmote(id, a, name, true)
		?.then(() => cb(null))
		.catch((err) => cb(Error(err)));
};

// Delete emote
const deleteEmote = () => {
	modal.open("delete-emote", {
		component: EmoteDeleteModal,
		props: { emote: props.emote },
		events: {
			delete: (reason) => onModalDeleteEmote(reason as string),
		},
	});
};
const onModalDeleteEmote = (reason: string) => {
	if (!props.emote) {
		return;
	}

	m.editEmote(props.emote.id, { deleted: true }, reason).catch((err) => actor.showErrorModal(err));
};
</script>

<style lang="scss" scoped>
@import "@scss/emote-page/emote-interactions.scss";
@import "@scss/transition.scss";

.button-slide-enter-active,
.button-slide-leave-active {
	transition: all 120ms ease;
}

.button-slide-enter-from,
.button-slide-leave-to {
	transform: scaleX(0);
}
</style>
