import { ChangeEmoteInSet, EditEmote } from "@gql/mutation/Emote";
import { CreateEmoteSet } from "@gql/mutation/EmoteSet";
import { UpdateUserConnection } from "@gql/users/connection";
import { UpdateUserEditors } from "@gql/mutation/UserEditors";
import { UpdateUserCosmetics } from "@gql/mutation/Cosmetic";
import { Common } from "@structures/Common";
import { useMutation } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { useActorStore } from "@store/actor";
import { ReadMessages } from "@/assets/gql/mutation/ReadMessages";

export const useMutationStore = defineStore("gql-mutations", {
	actions: {
		// Emote Set Mutations

		/**
		 *
		 * @param setID the id of the emote set to modify
		 * @param action the action to take on the list of emotes
		 * @param emoteID the id of the emote being modified in the set's emote list
		 * @param name an optional custom name for the emote
		 */
		async setEmoteInSet(setID: string, action: Common.ListItemAction, emoteID: string, name?: string) {
			const m = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);

			const actor = useActorStore();
			const r = m.mutate({
				action: action,
				id: setID,
				emote_id: emoteID as string,
				name: name,
			});
			r.then((res) => (res?.data ? actor.updateEmoteSet(res?.data?.emoteSet) : undefined));
			return r;
		},
		/**
		 * Create a new Emote Set
		 *
		 *
		 * @param name the name of the set
		 */
		async createEmoteSet(name: string) {
			const m = useMutation<CreateEmoteSet.Result, CreateEmoteSet.Variables>(CreateEmoteSet);

			const actor = useActorStore();
			const r = m.mutate({
				data: { name },
			});
			r.then((res) => (res?.data ? actor.addEmoteSet(res.data.createEmoteSet) : undefined));
			return r;
		},

		// User Mutations

		/**
		 * Edit a user's connection
		 *
		 * @param userID the ID of the user whose connection to update
		 * @param connectionID the id of the conneciton being updated
		 * @param data update data
		 * @returns
		 */
		async editUserConnection(userID: string, connectionID: string, data: UpdateUserConnection.Variables["d"]) {
			const m = useMutation<UpdateUserConnection.Result, UpdateUserConnection.Variables>(UpdateUserConnection);

			return m.mutate({
				id: userID,
				conn_id: connectionID,
				d: data,
			});
		},

		async editUserEditors(userID: string, editorID: string, data: UpdateUserEditors.Variables["d"]) {
			const m = useMutation<UpdateUserEditors.Result, UpdateUserEditors.Variables>(UpdateUserEditors);

			return m.mutate({
				id: userID,
				editor_id: editorID,
				d: data,
			});
		},

		async editUserCosmetics(userID: string, update: UpdateUserCosmetics.Variables["update"]) {
			const m = useMutation<UpdateUserCosmetics.Result, UpdateUserCosmetics.Variables>(UpdateUserCosmetics);

			return m.mutate({
				user_id: userID,
				update,
			});
		},

		async editEmote(emoteID: string, data: EditEmote.Variables["d"], reason = "") {
			const m = useMutation<EditEmote.Result, EditEmote.Variables>(EditEmote);

			return m.mutate({
				d: data,
				reason,
				id: emoteID,
			});
		},

		async readMessage(ids: string[], state: boolean) {
			const m = useMutation<ReadMessages>(ReadMessages);

			return m.mutate({
				ids: ids,
				read: state,
			});
		},
	},
});
