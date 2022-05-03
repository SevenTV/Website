<template>
	<div class="actions-wrapper">
		<div v-if="clientUser" class="action-group">
			<!-- BUTTON: USE EMOTE -->
			<div
				v-if="User.HasPermission(clientUser, Permissions.EditEmoteSet)"
				v-wave
				:in-channel="hasEmote"
				:other-version-active="!hasEmote && hasOtherVersion"
				:disabled="loading || (!hasEmote && slotsFull)"
				class="action-button"
				name="set-select"
				@click="setEmote(defaultEmoteSet?.id, hasEmote ? 'REMOVE' : hasOtherVersion ? 'SWITCH' : 'ADD')"
			>
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', hasEmote ? 'minus' : 'check']" />
				</span>
				<span v-if="slotsFull && !hasEmote && !hasOtherVersion">
					{{ t("emote_set.no_space").toUpperCase() }}
				</span>
				<span v-else-if="!hasEmote && hasOtherVersion">{{ t("emote.switch_version").toUpperCase() }}</span>
				<span v-else> {{ (hasEmote ? t("emote.disable") : t("emote.use")).toUpperCase() }} </span>
				<div class="separator" />
				<div class="extended-interact" @click.stop="openSetSelector">
					<font-awesome-icon selector="icon" :icon="['fas', 'ellipsis-h']" />
				</div>
			</div>
			<div class="use-emote-note">
				<span v-if="defaultEmoteSet">
					<p>{{ t("emote_set.editing", [defaultEmoteSet.name]) }}</p>
					<span v-if="defaultEmoteSet.owner && defaultEmoteSet.owner.id !== clientUser.id">
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
				v-if="canEditEmote"
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
					<font-awesome-icon :icon="['fas', 'pen']"></font-awesome-icon>
				</span>
				<span>{{ t("common.update").toUpperCase() }}</span>
			</router-link>

			<!-- BUTTON: REPORT -->
			<div
				v-if="User.HasPermission(clientUser, Permissions.ReportCreate)"
				ref="reportTrigger"
				v-wave
				class="action-button"
				name="report"
				@click="reportPromptVisible = !reportPromptVisible"
			>
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', 'flag']" />
				</span>
				<span>{{ t("common.report").toUpperCase() }}</span>
			</div>

			<!-- BUTTON: MORE -->
			<div v-if="canEditEmote" v-wave class="action-button" name="more">
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', 'ellipsis-v']" />
				</span>
				<span>{{ t("common.more").toUpperCase() }}</span>
			</div>
		</div>
		<div ref="reportPopper" :style="{ position: 'absolute' }">
			<ReportForm v-if="reportPromptVisible" :target="emote" kind="EMOTE" @close="reportPromptVisible = false" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, PropType, onMounted, ref, computed } from "vue";
import { User } from "@/structures/User";
import { Emote } from "@/structures/Emote";
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import { createPopper } from "@popperjs/core";
import { useMutationStore } from "@/store/mutation";
import { Permissions } from "@/structures/Role";
import { Common } from "@/structures/Common";
import { useModal } from "@/store/modal";
import ReportForm from "@/components/utility/ReportForm.vue";
import ModalCreateEmoteSet from "@/components/modal/ModalCreateEmoteSet.vue";
import ModalSelectEmoteSet from "@/components/modal/ModalSelectEmoteSet.vue";
import UserTag from "@/components/utility/UserTag.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	emote: {
		type: Object as PropType<Emote | null>,
		required: true,
	},
});

const { t } = useI18n();
const modal = useModal();
const actor = useActorStore();
const { user: clientUser, activeEmotes, editableEmoteSets, defaultEmoteSet, defaultEmoteSetID } = storeToRefs(actor);
const canEditEmote = computed(
	() =>
		clientUser.value &&
		(props.emote?.owner?.id === clientUser.value.id ||
			User.HasPermission(clientUser.value, Permissions.EditAnyEmote))
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
	() => props.emote?.versions?.filter((ver) => activeEmotes.value.has(ver.id) && ver.id !== props.emote?.id) ?? []
);

const isNameConflict = computed(
	() =>
		props.emote &&
		defaultEmoteSetID.value &&
		!actor.getActiveEmoteInSet(defaultEmoteSetID.value, props.emote.id) &&
		actor.getActiveEmoteInSetByName(defaultEmoteSetID.value, props.emote.name)
);
const slotsFull = computed(
	() => defaultEmoteSet.value && defaultEmoteSet.value.emotes?.length >= defaultEmoteSet.value.emote_slots
);

// Mutation
const loading = ref(false);
const m = useMutationStore();

const setEmote = async (
	setID: string | undefined,
	action: Common.ListItemAction | "SWITCH",
	name?: string,
	skipModal?: boolean
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
</script>

<style lang="scss" scoped>
@import "@scss/emote-page/emote-interactions.scss";
</style>
