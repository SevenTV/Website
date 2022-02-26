<template>
	<div class="actions-wrapper">
		<div v-if="clientUser" class="action-group">
			<!-- BUTTON: USE EMOTE -->
			<div
				v-if="User.HasPermission(clientUser, Permissions.EditEmoteSet)"
				v-wave
				:in-channel="hasEmote"
				:disabled="loading"
				class="action-button"
				name="add-to-channel"
				@click="setEmote(defaultEmoteSet?.id, hasEmote ? 'REMOVE' : 'ADD')"
			>
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', hasEmote ? 'minus' : 'check']" />
				</span>
				<span> {{ hasEmote ? "DISABLE" : "USE" }} EMOTE </span>
				<div class="separator" />
				<div class="extended-interact" @click.stop="openSetSelector">
					<font-awesome-icon selector="icon" :icon="['fas', 'ellipsis-h']" />
				</div>
			</div>
			<div class="use-emote-note">
				<span v-if="defaultEmoteSet">
					<p>Editing {{ defaultEmoteSet.name }}</p>
					<span v-if="defaultEmoteSet.owner && defaultEmoteSet.owner.id !== clientUser.id">
						(<UserTag :hide-avatar="true" :user="defaultEmoteSet.owner" />'s Emote Set)
					</span>
					<span v-else class="as-self"> (Owned Emote Set) </span>
				</span>
				<span v-else> (No set selected) </span>
			</div>

			<!-- BUTTON: UPDATE -->
			<div v-if="canEditEmote" v-wave class="action-button" name="update">
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', 'pen']"></font-awesome-icon>
				</span>
				<span>UPDATE</span>
			</div>

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
				<span>REPORT</span>
			</div>

			<!-- BUTTON: MORE -->
			<div v-if="canEditEmote" v-wave class="action-button" name="more">
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', 'ellipsis-v']" />
				</span>
				<span>MORE</span>
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

const props = defineProps({
	emote: {
		type: Object as PropType<Emote | null>,
		required: true,
	},
});

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
const isNameConflict = computed(
	() =>
		props.emote &&
		defaultEmoteSetID.value &&
		!actor.getActiveEmoteInSet(defaultEmoteSetID.value, props.emote.id) &&
		actor.getActiveEmoteInSetByName(defaultEmoteSetID.value, props.emote.name)
);

// Mutation
const loading = ref(false);
const m = useMutationStore();

const setEmote = (setID: string | undefined, action: Common.ListItemAction, name?: string, skipModal?: boolean) => {
	if (!setID || !props.emote || (!name && isNameConflict.value && !skipModal)) {
		if (clientUser.value && !editableEmoteSets.value.size) {
			modal.open({
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
	return m.setEmoteInSet(setID, action, props.emote?.id, name).finally(() => (loading.value = false));
};
const openSetSelector = () =>
	modal.open({
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
