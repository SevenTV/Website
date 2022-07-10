import { EmoteSet } from "@structures/EmoteSet";
import { User } from "@structures/User";
import gql from "graphql-tag";
import { UserPartialFragment } from "@gql/users/user";
import { Role } from "@/structures/Role";

export const GetCurrentUser = gql`
	query GetCurrentUser {
		user: actor {
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
			roles
			emote_sets {
				id
				name
				capacity
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

export const GetAppState = gql`
	query AppState {
		globalEmoteSet: namedEmoteSet(name: GLOBAL) {
			id
			name
			emotes {
				id
				name
				flags
			}
			capacity
		}
		roles: roles {
			id
			name
			allowed
			denied
			position
			color
		}
	}
`;

export interface AppState {
	clientUser: User;
	roles: Role[];
	globalEmoteSet: EmoteSet;
}
