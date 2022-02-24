<template>
	<span class="actionw-modify-emotes-in-emote-set" @click="run">
		<slot />
	</span>

	<template v-if="promptForSet">
		<ModalCreateEmoteSet
			v-if="clientUser && !clientUser.emote_sets?.length"
			:starting-value="{ name: `${clientUser.display_name}'s Emotes` }"
			@close="promptForSet = false"
		/>
		<ModalSelectEmoteSet v-else @close="promptForSet = false" />
	</template>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { ChangeEmoteInSet } from "@/assets/gql/mutation/Emote";
import { useMutation } from "@vue/apollo-composable";
import { Common } from "@/structures/Common";
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import ModalCreateEmoteSet from "../modal/ModalCreateEmoteSet.vue";
import ModalSelectEmoteSet from "../modal/ModalSelectEmoteSet.vue";

const props = defineProps({
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
});

const actorStore = useActorStore();
const { user: clientUser } = storeToRefs(actorStore);
const setEmotes = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);
const promptForSet = ref(false);
const run = async () => {
	if (!clientUser.value) {
		return;
	}
	let setID = actorStore.channelEmoteSets[0]?.id;
	if (!setID) {
		promptForSet.value = true;
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
</script>
