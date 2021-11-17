<template>
	<IconButton
		class="emote-btn"
		:disabled="isLoading"
		:key="clientUser?.channel_emotes?.length"
		:scale="3"
		:fa-icon="isChannelEmote ? 'minus' : 'plus'"
		:tooltip="isChannelEmote ? $t('emote.removeFromChannel') : $t('emote.addToChannel')"
		v-on:interact="() => interact('SET_CHANNEL_EMOTE')"
	></IconButton>

	<IconButton class="emote-btn" :scale="3" fa-icon="pen-square" :tooltip="$t('emote.update')"></IconButton>
	<IconButton
		class="emote-btn"
		ref="reportTrigger"
		@click="reportPromptVisible = !reportPromptVisible"
		:scale="3"
		fa-icon="flag"
		:tooltip="$t('emote.report')"
	></IconButton>
	<IconButton class="emote-btn" :scale="3" fa-icon="lock" :tooltip="$t('emote.makePrivate')"></IconButton>
	<IconButton class="emote-btn" :scale="3" fa-icon="star" :tooltip="$t('emote.makeGlobal')"></IconButton>

	<div ref="reportPopper" :style="{ position: 'absolute' }">
		<ReportForm :target="emote" kind="EMOTE" @close="reportPromptVisible = false" v-if="reportPromptVisible" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref } from "vue-demi";
import { User } from "@/structures/User";
import { useMutation } from "@vue/apollo-composable";
import { SetChannelEmote } from "@/assets/gql/mutation/SetChannelEmote.gql";
import { Emote } from "@/structures/Emote";
import { useStore } from "@/store";
import { ApplyMutation } from "@/structures/Update";
import { createPopper } from "@popperjs/core";
import IconButton from "@/components/utility/IconButton.vue";
import ReportForm from "@/components/utility/ReportForm.vue";

export default defineComponent({
	components: {
		IconButton,
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
		const clientUser = store.getters.clientUser as User;
		const isLoading = ref(false);

		const interact = (btn: string) => {
			switch (btn) {
				// Interact: Set Channel Emote (Add or Remove)
				case "SET_CHANNEL_EMOTE": {
					const action = props.isChannelEmote ? "REMOVE" : "ADD";
					isLoading.value = true;
					mutations.setChannelEmote
						.mutate({
							user_id: clientUser?.id, // TODO: use ID of current impersonated user
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
		};
	},
});
</script>
