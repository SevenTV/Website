import { EmoteSet } from "@/structures/EmoteSet";
import { gql } from "graphql-tag";

export const WatchEmoteSet = gql`
	subscription WatchEmoteSet($id: ObjectID!, $init: Boolean) {
		emoteSet(id: $id, init: $init) {
			id
			name
			emote_slots
			emotes {
				id
				name
				emote {
					id
					name
					flags
					images {
						name
						format
						url
					}
					owner {
						id
						display_name
						tag_color
						roles {
							id
							name
							color
						}
					}
				}
			}
			owner {
				id
				username
				display_name
				tag_color
				avatar_url
				roles {
					id
					name
					color
				}
			}
		}
	}
`;

export const WatchEmoteSetInternal = gql`
	subscription WatchEmoteSetMin($id: ObjectID!, $init: Boolean) {
		emoteSet(id: $id, init: $init) {
			id
			name
			emote_slots
			emotes {
				id
				name
			}
			owner {
				id
				display_name
				tag_color
				avatar_url
			}
		}
	}
`;

export interface GetEmoteSet {
	emoteSet: EmoteSet;
}
