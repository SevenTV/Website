<template>
	<span @click="run">
		<slot />
	</span>

	<template v-if="promptForSet">
		<ModalCreateEmoteSet :starting-value="{ name: promptForSet }" @close="promptForSet = ''" />
	</template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ChangeEmoteInSet } from "@/assets/gql/mutation/Emote";
import { useMutation } from "@vue/apollo-composable";
import { Common } from "@/structures/Common";
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import ModalCreateEmoteSet from "../modal/ModalCreateEmoteSet.vue";

export default defineComponent({
	components: { ModalCreateEmoteSet },
	props: {
		action: {
			type: String as PropType<Common.ListItemAction>,
			required: true,
		},
		emoteID: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const actorStore = useActorStore();
		const { user: clientUser } = storeToRefs(actorStore);
		const setEmotes = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);
		// const setCreate = useMutation<CreateEmoteSet.Result, CreateEmoteSet.Variables>(CreateEmoteSet);
		const promptForSet = ref("");
		const run = async () => {
			if (!clientUser.value) {
				return;
			}
			let setID = actorStore.channelEmoteSets[0]?.id;
			if (!setID) {
				promptForSet.value = `${clientUser.value?.display_name}'s Emotes`;
				return;
			}
			if (setID) {
				setEmotes.mutate({
					action: props.action,
					id: setID,
					emote_id: props.emoteID as string,
					name: props.name,
				});
			}
		};
		return { run, promptForSet };
	},
});
</script>
