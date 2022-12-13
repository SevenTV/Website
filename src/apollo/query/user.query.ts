import { User } from "@/structures/User";
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
			paint_id
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

export const userForUserPageQuery = gql`
	query GetUserForUserPage($id: ObjectID!) {
		user(id: $id) {
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
						paint_id
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

export namespace userForUserPageQuery {
	export interface Variables {
		id: string;
	}

	export interface Result {
		user: User;
	}
}

export const userEmoteSetsQuery = gql`
	query GetUserEmoteSets($id: ObjectID!) {
		user(id: $id) {
			id
			emote_sets {
				id
				name
				capacity
				emote_count
				origins {
					id
					weight
				}
				owner {
					id
					display_name
					style {
						color
					}
					avatar_url
					connections {
						id
						emote_capacity
						emote_set_id
						platform
						display_name
					}
				}
			}
		}
	}
`;

export namespace userEmoteSetsQuery {
	export interface Variables {
		id: string;
	}
	export interface Result {
		user: User;
	}
}

export const userActivityQuery = gql`
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

export namespace userActivityQuery {
	export interface Variables {
		id: string;
	}

	export interface Result {
		user: User;
	}
}

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
				paint_id
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
						paint_id
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
				host {
					url
					files(formats: $formats) {
						name
						format
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
