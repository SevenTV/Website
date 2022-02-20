import { Common } from "@/structures/Common";
import { EmoteSet } from "@/structures/EmoteSet";
import gql from "graphql-tag";

export const ChangeEmoteInSet = gql`
	mutation ChangeEmoteInSet($id: ObjectID!, $action: ListItemAction!, $emote_id: ObjectID!, $name: String) {
		emoteSet(id: $id) {
			emotes(id: $emote_id, action: $action, name: $name) {
				id
				name
			}
		}
	}
`;

export namespace ChangeEmoteInSet {
	export interface Variables {
		action: Common.ListItemAction;
		id: string;
		emote_id: string;
		name?: string;
	}
	export interface Result {
		emoteSet: EmoteSet;
	}
}
