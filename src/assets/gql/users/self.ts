import { EmoteSet } from "@structures/EmoteSet";
import { User } from "@structures/User";
import gql from "graphql-tag";
import { UserPartialFragment } from "@gql/users/user";

export const GetCurrentUser = gql`
	query GetCurrentUser {
		user: currentUser {
			id
			username
			display_name
			created_at
			avatar_url
			tag_color
			biography
			editor_of {
				id
				permissions
				user {
					connections {
						id
						display_name
						platform
						emote_slots
						emote_set_id
					}
				}
			}
			roles {
				id
				name
				color
				allowed
				denied
				position
				invisible
			}
			emote_sets {
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
			connections {
				id
				display_name
				platform
				linked_at
				emote_slots
				emote_set_id
			}
		}
	}
`;

export const WatchCurrentUser = gql`
	subscription WatchCurrentUser {
		user: currentUser {
			...USER_PARTIAL_FRAGMENT
		}
	}
	${UserPartialFragment}
`;

export const GetClientRequiredData = gql`
	query ClientRequiredData {
		globalEmoteSet: namedEmoteSet(name: GLOBAL) {
			id
			name
			emotes {
				id
				name
				flags
			}
			emote_slots
		}
	}
`;

export interface ClientRequiredData {
	clientUser: User;
	globalEmoteSet: EmoteSet;
}
