import gql from "graphql-tag";
import { UserPartialFragment } from "@/apollo/query/user.query";
import { Paint } from "@/structures/Cosmetic";
import { EmoteSet } from "@/structures/EmoteSet";
import { Role } from "@/structures/Role";
import { User } from "@/structures/User";

export const GetCurrentUser = gql`
	query GetCurrentUser {
		user: actor {
			id
			username
			display_name
			created_at
			avatar_url
			style {
				color
				paint_id
			}
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
						emote_capacity
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
					data {
						name
					}
				}
				owner {
					id
					display_name
					style {
						color
					}
					avatar_url
				}
			}
			connections {
				id
				display_name
				platform
				linked_at
				emote_capacity
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
