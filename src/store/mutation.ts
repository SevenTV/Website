import { ChangeEmoteInSet } from "@/assets/gql/mutation/Emote";
import { Common } from "@/structures/Common";
import { useMutation } from "@vue/apollo-composable";
import { defineStore } from "pinia";

export const useMutationStore = defineStore("gql-mutations", {
	actions: {
		setEmoteInSet(setID: string, action: Common.ListItemAction, emoteID: string, name?: string) {
			const setEmotes = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);

			setEmotes.mutate({
				action: action,
				id: setID,
				emote_id: emoteID as string,
				name: name,
			});
		},
	},
});
