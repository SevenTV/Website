import { User } from "@/structures/User";
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
		roles {
			id
			name
			color
			allowed
			denied
			position
		}
		connections {
			id
			display_name
			platform
			linked_at
			emote_slots
			emote_set {
				id
				name
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
							width
							height
						}
					}
				}
			}
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
			roles {
				id
				name
				color
				allowed
				denied
				position
			}
		}
	}
`;

export const GetCurrentUser = gql`
	subscription GetCurrentUser {
		user: currentUser {
			...USER_FRAGMENT
		}
	}
	${UserFragment}
`;

export interface GetUser {
	user: User;
}
