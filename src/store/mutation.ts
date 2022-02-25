import { ChangeEmoteInSet } from "@/assets/gql/mutation/Emote";
import { Common } from "@/structures/Common";
import { useMutation } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { useActorStore } from "./actor";

export const useMutationStore = defineStore("gql-mutations", {
	actions: {
		setEmoteInSet(setID: string, action: Common.ListItemAction, emoteID: string, name?: string) {
			const setEmotes = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);

			const actor = useActorStore();
			return setEmotes
				.mutate({
					action: action,
					id: setID,
					emote_id: emoteID as string,
					name: name,
				})
				.then((res) => (res?.data ? actor.updateEmoteSet(res?.data?.emoteSet) : undefined));
		},
	},
});
