import { EmoteSet } from "@/structures/EmoteSet";
import { gql } from "graphql-tag";

export const WatchEmoteSet = gql`
	subscription WatchEmoteSet($id: ObjectID!) {
		emoteSet(id: $id) {
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
				roles {
					id
					name
					color
				}
			}
		}
	}
`;

export interface GetEmoteSet {
	emoteSet: EmoteSet;
}
