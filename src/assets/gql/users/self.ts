import { EmoteSet } from "@structures/EmoteSet";
import { User } from "@structures/User";
import gql from "graphql-tag";
import { UserPartialFragment } from "@gql/users/user";
import { Role } from "@/structures/Role";
import { Paint } from "@/structures/Cosmetic";

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
			inbox_unread_count
			editor_of {
				id
				permissions
				user {
					emote_sets {
						id
					}
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

export const GetUserCosmetics = gql`
	query GetUserCosmetics($id: ObjectID!) {
		user(id: $id) {
			id
			cosmetics {
				id
				kind
				selected
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
			invisible
		}
	}
`;

export interface AppState {
	clientUser: User;
	roles: Role[];
	globalEmoteSet: EmoteSet;
	cosmetics: {
		paints: Paint[];
	};
}
