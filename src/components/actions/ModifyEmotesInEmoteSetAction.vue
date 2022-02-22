<template>
	<span @click="run">
		<slot />
	</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ChangeEmoteInSet } from "@/assets/gql/mutation/Emote";
import { useMutation } from "@vue/apollo-composable";
import { Common } from "@/structures/Common";
import { CreateEmoteSet } from "@/assets/gql/mutation/EmoteSet";
import { useActorStore } from "@/store/actor";

export default defineComponent({
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
		const clientUser = computed(() => actorStore.getUser);
		const setEmotes = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);
		const setCreate = useMutation<CreateEmoteSet.Result, CreateEmoteSet.Variables>(CreateEmoteSet);

		const run = async () => {
			let setID = clientUser.value?.connections.map((uc) => uc.emote_set?.id).filter((s) => s)[0];
			if (!setID) {
				await setCreate
					.mutate({
						data: { name: `${clientUser.value.display_name}'s Emotes` },
					})
					.then((res) => (setID = res?.data?.createEmoteSet.id ?? ""));
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
		return { run };
	},
});
</script>
