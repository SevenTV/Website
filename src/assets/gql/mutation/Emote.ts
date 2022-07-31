import { Emote } from "@/structures/Emote";
import { Common } from "@structures/Common";
import { EmoteSet } from "@structures/EmoteSet";
import gql from "graphql-tag";

export const ChangeEmoteInSet = gql`
	mutation ChangeEmoteInSet($id: ObjectID!, $action: ListItemAction!, $emote_id: ObjectID!, $name: String) {
		emoteSet(id: $id) {
			id
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

export const EditEmote = gql`
	mutation EditEmote($id: ObjectID!, $d: EmoteUpdate!, $reason: String) {
		emote(id: $id) {
			id
			update(params: $d, reason: $reason) {
				id
				name
				versions {
					id
					name
					listed
				}
			}
		}
	}
`;

export namespace EditEmote {
	export interface Variables {
		id?: string;
		reason?: string;
		d: Partial<{
			name: string;
			version_name: string;
			version_description: string;
			flags: number;
			owner_id: string;
			tags: string[];
			listed: boolean;
			deleted?: boolean;
		}>;
	}
	export interface Result {
		emote: Emote;
	}
}
