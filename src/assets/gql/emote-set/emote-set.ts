import { EmoteSet } from "@structures/EmoteSet";
import { gql } from "graphql-tag";

export const GetEmoteSet = gql`
	query GetEmoteSet($id: ObjectID!, $formats: [ImageFormat!]) {
		emoteSet(id: $id) {
			id
			name
			capacity
			emotes {
				id
				name
				emote {
					id
					name
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
						tag_color
						roles
					}
				}
			}
			owner {
				id
				username
				display_name
				tag_color
				avatar_url
				roles
				editors {
					id
					permissions
				}
				connections {
					emote_slots
				}
			}
		}
	}
`;

export const GetEmoteSetMin = gql`
	query GetEmoteSetMin($id: ObjectID!) {
		emoteSet(id: $id) {
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
	}
`;

export const WatchEmoteSet = gql`
	subscription WatchEmoteSet($id: ObjectID!, $init: Boolean) {
		emoteSet(id: $id, init: $init) {
			id
			name
			capacity
			emotes {
				id
				name
				emote {
					id
					name
					flags
					listed
					images {
						name
						format
						url
					}
					owner {
						id
						display_name
						tag_color
						roles
					}
				}
			}
			owner {
				id
				username
				display_name
				tag_color
				avatar_url
				roles
			}
		}
	}
`;

export const WatchEmoteSetInternal = gql`
	subscription WatchEmoteSetMin($id: ObjectID!, $init: Boolean) {
		emoteSet(id: $id, init: $init) {
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
	}
`;

export interface GetEmoteSet {
	emoteSet: EmoteSet;
}
