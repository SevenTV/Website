import { User } from "@structures/User";
import gql from "graphql-tag";

export const UserFragment = gql`
	fragment USER_FRAGMENT on User {
		id
		username
		display_name
		created_at
		avatar_url
		tag_color
		biography
		editors {
			user {
				id
				username
				display_name
				avatar_url
				tag_color
			}
		}
		roles
		emote_sets {
			id
			name
			emote_slots
			emotes {
				id
				name
				emote {
					id
					name
					lifecycle
					flags
					listed
					images(formats: [WEBP]) {
						name
						format
						url
					}
					owner {
						id
						display_name
						tag_color
					}
				}
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
`;

export const UserPartialFragment = gql`
	fragment USER_PARTIAL_FRAGMENT on UserPartial {
		id
		user_type
		username
		display_name
		created_at
		avatar_url
		biography
		tag_color
		roles
		connections {
			id
			platform
			display_name
			emote_set_id
		}
	}
`;

export const GetUser = gql`
	query GetUser($id: ObjectID!) {
		user(id: $id) {
			...USER_FRAGMENT
		}
	}
	${UserFragment}
`;

export const GetUserForCard = gql`
	query GetUserForCard($id: ObjectID!) {
		user(id: $id) {
			id
			display_name
			avatar_url
			tag_color
			roles
		}
	}
`;

export const WatchUser = gql`
	subscription WatchUser($id: ObjectID!) {
		user(id: $id) {
			...USER_PARTIAL_FRAGMENT
		}
	}
	${UserPartialFragment}
`;

export interface GetUser {
	user: User;
}
