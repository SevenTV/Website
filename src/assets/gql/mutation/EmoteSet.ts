import { EmoteSet } from "@/structures/EmoteSet";
import gql from "graphql-tag";

export const CreateEmoteSet = gql`
	mutation CreateEmoteSet($data: CreateEmoteSetInput!) {
		createEmoteSet(data: $data) {
			id
			name
			emote_slots
			owner {
				id
				display_name
				tag_color
				avatar_url
			}
			emotes {
				id
				name
			}
		}
	}
`;

export namespace CreateEmoteSet {
	export interface Result {
		createEmoteSet: EmoteSet;
	}
	export interface Variables {
		data: {
			name: string;
		};
	}
}
