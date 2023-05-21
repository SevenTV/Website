import { useMutation } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { UpdateUserCosmetics } from "@/apollo/mutation/cosmetic.mutation";
import { CreateEmoteSet, DeleteEmoteSet, UpdateEmoteSet } from "@/apollo/mutation/emote-set.mutation";
import { ChangeEmoteInSet, EditEmote, mergeEmoteMutation } from "@/apollo/mutation/emote.mutation";
import { ReadMessages } from "@/apollo/mutation/message.mutation";
import { UpdateUserConnection } from "@/apollo/mutation/user-connection.mutation";
import { UpdateUserEditors } from "@/apollo/mutation/user-editor.mutation";
import { ListItemAction } from "@/structures/Common";

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
		async setEmoteInSet(setID: string, action: ListItemAction, emoteID: string, name?: string) {
			const m = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);

			const r = m.mutate({
				action: action,
				id: setID,
				emote_id: emoteID as string,
				name: name,
			});
			return r;
		},
		/**
		 * Create a new Emote Set
		 *
		 *
		 * @param name the name of the set
		 */
		async createEmoteSet(userID: string, name: string) {
			const m = useMutation<CreateEmoteSet.Result, CreateEmoteSet.Variables>(CreateEmoteSet);

			return m.mutate({
				user_id: userID,
				data: { name },
			});
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

		async mergeEmote(emoteID: string, targetID: string, reason = "") {
			const m = useMutation<mergeEmoteMutation.Result, mergeEmoteMutation.Variables>(mergeEmoteMutation);

			return m.mutate({
				id: emoteID,
				target_id: targetID,
				reason,
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

		async editEmoteSet(setID: string, data: UpdateEmoteSet.Variables["data"]) {
			const m = useMutation<UpdateEmoteSet.Result, UpdateEmoteSet.Variables>(UpdateEmoteSet);

			return m.mutate({
				data,
				id: setID,
			});
		},

		async deleteEmoteSet(setID: string) {
			const m = useMutation<DeleteEmoteSet.Result, DeleteEmoteSet.Variables>(DeleteEmoteSet);

			return m.mutate({
				id: setID,
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
