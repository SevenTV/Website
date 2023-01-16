import { gql } from "graphql-tag";
import { EmoteSet } from "@/structures/EmoteSet";

export const GetEmoteSet = gql`
	query GetEmoteSet($id: ObjectID!, $formats: [ImageFormat!]) {
		emoteSet(id: $id) {
			id
			name
			flags
			capacity
			origins {
				id
				weight
			}
			emotes {
				id
				name
				actor {
					id
					display_name
					avatar_url
				}
				origin_id
				data {
					id
					name
					flags
					state
					lifecycle
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
						roles
					}
				}
			}
			owner {
				id
				username
				display_name
				style {
					color
				}
				avatar_url
				roles
				connections {
					id
					display_name
					emote_capacity
					platform
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
			flags
			capacity
			origins {
				id
				weight
			}
			emotes {
				id
				name
				origin_id
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
				connections {
					id
					username
					platform
				}
			}
		}
	}
`;

export const GetEmoteSetForCard = gql`
	query GetEmoteSetForCard($id: ObjectID!, $limit: Int) {
		emoteSet(id: $id) {
			emote_count
			capacity
			flags
			emotes(limit: $limit, origins: true) {
				id
				name
				origin_id
				data {
					id
					name
					host {
						url
						files {
							name
							format
						}
					}
				}
			}
		}
	}
`;

export interface GetEmoteSet {
	emoteSet: EmoteSet;
}
