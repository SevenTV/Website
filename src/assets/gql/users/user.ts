import { User } from "@structures/User";
import gql from "graphql-tag";

export const UserPartialFragment = gql`
	fragment USER_PARTIAL_FRAGMENT on UserPartial {
		id
		type
		username
		display_name
		created_at
		avatar_url
		biography
		style {
			color
		}
		roles
		connections {
			id
			platform
			username
			display_name
			emote_set_id
			emote_capacity
		}
	}
`;

export const GetUser = gql`
	query GetUser($id: ObjectID!) {
		user(id: $id) {
			id
			username
			display_name
			created_at
			avatar_url
			style {
				color
			}
			biography
			editors {
				id
				permissions
				visible
				user {
					id
					username
					display_name
					avatar_url
					style {
						color
					}
				}
			}
			roles
			connections {
				id
				username
				display_name
				platform
				linked_at
				emote_capacity
				emote_set_id
			}
		}
	}
`;

export const GetUserEmoteData = gql`
	query GetUserEmoteData($id: ObjectID!, $formats: [ImageFormat!]) {
		user(id: $id) {
			emote_sets {
				id
				name
				capacity
				emotes {
					id
					name
					actor {
						id
						username
						display_name
						avatar_url
						style {
							color
						}
					}
					emote {
						id
						name
						lifecycle
						flags
						listed
						trending
						images(formats: $formats) {
							name
							format
							url
						}
						owner {
							id
							display_name
							style {
								color
							}
						}
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
		}
	}
`;

export const GetUserOwnedEmotes = gql`
	query GetUserOwnedEmotes($id: ObjectID!, $formats: [ImageFormat!]) {
		user(id: $id) {
			owned_emotes {
				id
				name
				lifecycle
				flags
				listed
				trending
				images(formats: $formats) {
					name
					format
					url
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
		}
	}
`;

export const GetMinimalUser = gql`
	query GetMinimalUser($id: ObjectID!) {
		user(id: $id) {
			id
			display_name
			avatar_url
			style {
				color
			}
			roles
		}
	}
`;

export const GetUserActivity = gql`
	query GetUserActivity($id: ObjectID!, $limit: Int) {
		user(id: $id) {
			id
			activity(limit: $limit) {
				id
				kind
				created_at
				target_id
				target_kind
				actor {
					id
					username
					display_name
					style {
						color
					}
					avatar_url
				}
				changes {
					format
					key
					value
					array_value {
						added
						updated
						removed
					}
				}
			}
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

export const SearchUsers = gql`
	query SearchUsers($query: String!) {
		users(query: $query) {
			id
			username
			display_name
			roles
			style {
				color
			}
			avatar_url
		}
	}
`;

export const GetUsers = gql`
	query UsersByID($list: [ObjectID!]!) {
		usersByID(list: $list) {
			id
			username
			display_name
			roles
			style {
				color
			}
			avatar_url
		}
	}
`;

export const GetUserEditorOf = gql`
	query GetUserEditorOf($id: ObjectID!) {
		user(id: $id) {
			id
			editor_of {
				user {
					id
					username
					display_name
					roles
					style {
						color
					}
					avatar_url
				}
			}
		}
	}
`;

export interface GetUser {
	user: User;
}
