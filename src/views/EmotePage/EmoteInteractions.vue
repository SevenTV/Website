<template>
	<IconButton
		:disabled="isLoading"
		:key="clientUser?.channel_emotes?.length"
		:scale="3"
		:fa-icon="isChannelEmote ? 'minus' : 'plus'"
		:tooltip="isChannelEmote ? 'Remove From Channel' : 'Add To Channel'"
		v-on:interact="() => interact('SET_CHANNEL_EMOTE')"
	></IconButton>

	<IconButton :scale="3" fa-icon="pen-square" tooltip="Update Emote"></IconButton>
	<IconButton :scale="3" fa-icon="flag" tooltip="Report Emote"></IconButton>
	<IconButton :scale="3" fa-icon="lock" tooltip="Make Private"></IconButton>
	<IconButton :scale="3" fa-icon="star" tooltip="Make Global"></IconButton>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue-demi";
import { User } from "@/structures/User";
import { useMutation } from "@vue/apollo-composable";
import { SetChannelEmote } from "@/assets/gql/mutation/SetChannelEmote.gql";
import { Emote } from "@/structures/Emote";
import { useStore } from "@/store";
import { ApplyMutation } from "@/structures/Update";
import IconButton from "@/components/utility/IconButton.vue";
import { ref } from "vue";

export default defineComponent({
	components: {
		IconButton,
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

		const mutations = {
			setChannelEmote: useMutation<SetChannelEmote>(SetChannelEmote),
		};

		return {
			clientUser,
			interact,
			isLoading,
		};
	},
});
</script>
