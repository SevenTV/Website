<template>
	<div class="actions-wrapper">
		<div class="action-group">
			<!-- BUTTON: USE EMOTE -->
			<div
				v-if="UserHasPermission(clientUser, Permissions.EditEmoteSet)"
				v-wave
				class="action-button"
				name="add-to-channel"
			>
				<span class="action-icon">
					<font-awesome-icon :icon="['fas', 'check']" />
				</span>
				<span>USE EMOTE</span>
				<div class="separator" />
				<div class="extended-interact">
					<font-awesome-icon selector="icon" :icon="['fas', 'ellipsis-h']" />
				</div>
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
				v-if="UserHasPermission(clientUser, Permissions.ReportCreate)"
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

<script lang="ts">
import { defineComponent, PropType, onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { User } from "@/structures/User";
import { useMutation } from "@vue/apollo-composable";
import { SetChannelEmote } from "@/assets/gql/mutation/SetChannelEmote.gql";
import { Emote } from "@/structures/Emote";
import { useStore } from "@/store";
import { ApplyMutation } from "@/structures/Update";
import { createPopper } from "@popperjs/core";
import { Permissions } from "@/structures/Role";
import ReportForm from "@/components/utility/ReportForm.vue";

export default defineComponent({
	components: {
		ReportForm,
	},
	props: {
		isChannelEmote: Boolean,
		emote: {
			type: Object as PropType<Emote | null>,
			required: true,
		},
	},
	setup(props) {
		const store = useStore();
		const { t } = useI18n();
		const clientUser = computed(() => store.getters.clientUser as User | null);
		const isLoading = ref(false);
		const canEditEmote = computed(
			() =>
				clientUser.value &&
				(props.emote?.owner?.id === clientUser.value.id ||
					User.HasPermission(clientUser.value, Permissions.EditAnyEmote))
		);

		const interact = (btn: string) => {
			switch (btn) {
				// Interact: Set Channel Emote (Add or Remove)
				case "SET_CHANNEL_EMOTE": {
					const action = props.isChannelEmote ? "REMOVE" : "ADD";
					isLoading.value = true;
					mutations.setChannelEmote
						.mutate({
							user_id: clientUser.value?.id, // TODO: use ID of current impersonated user
							target: {
								id: props.emote?.id,
							},
							action,
						})
						.then((res) => {
							ApplyMutation(clientUser, {
								action: "set",
								field: "channel_emotes",
								value: JSON.stringify(res?.data?.setChannelEmote.channel_emotes),
							});
						})
						.finally(() => (isLoading.value = false));
					break;
				}

				default:
					break;
			}
		};

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

		const mutations = {
			setChannelEmote: useMutation<SetChannelEmote>(SetChannelEmote),
		};

		return {
			clientUser,
			interact,
			isLoading,
			reportPopper,
			reportPromptVisible,
			UserHasPermission: User.HasPermission,
			Permissions,
			canEditEmote,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/emote-page/emote-interactions.scss";
</style>
