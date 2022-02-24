<template>
	<div class="actions-wrapper">
		<div v-if="clientUser" class="action-group">
			<!-- BUTTON: USE EMOTE -->
			<ModifyEmotesInEmoteSetAction v-if="emote" :action="hasEmote ? 'REMOVE' : 'ADD'" :emote-i-d="emote.id">
				<div
					v-if="User.HasPermission(clientUser, Permissions.EditEmoteSet)"
					v-wave
					:in-channel="hasEmote"
					class="action-button"
					name="add-to-channel"
				>
					<span class="action-icon">
						<font-awesome-icon :icon="['fas', hasEmote ? 'minus' : 'check']" />
					</span>
					<span> {{ hasEmote ? "DISABLE" : "USE" }} EMOTE </span>
					<div class="separator" />
					<div class="extended-interact" @click.stop>
						<font-awesome-icon selector="icon" :icon="['fas', 'ellipsis-h']" />
					</div>
				</div>
			</ModifyEmotesInEmoteSetAction>
			<div class="use-emote-note">
				<span v-if="defaultEmoteSet"> Adding to {{ defaultEmoteSet.name }} </span>
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
import { Permissions } from "@/structures/Role";
import ReportForm from "@/components/utility/ReportForm.vue";
import ModifyEmotesInEmoteSetAction from "@/components/actions/ModifyEmotesInEmoteSetAction.vue";

const props = defineProps({
	emote: {
		type: Object as PropType<Emote | null>,
		required: true,
	},
});

const { user: clientUser, activeEmotes, defaultEmoteSet } = storeToRefs(useActorStore());
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

const hasEmote = computed(() => activeEmotes.value.has(props.emote?.id as string));
</script>

<style lang="scss" scoped>
@import "@scss/emote-page/emote-interactions.scss";
</style>
