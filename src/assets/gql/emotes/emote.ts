import { Emote } from "@structures/Emote";
import gql from "graphql-tag";

export const GetEmote = gql`
	query Emote($id: ObjectID!) {
		emote(id: $id) {
			id
			created_at
			name
			lifecycle
			owner {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			flags
			versions {
				id
				name
				description
				created_at
				lifecycle
				images {
					name
					format
					url
					width
					height
				}
			}
			animated
		}
	}
`;

export const GetEmoteStatistics = gql`
	query GetEmoteStatistics($id: ObjectID!) {
		emote(id: $id) {
			id
			common_names {
				name
				count
			}
		}
	}
`;

export const WatchEmote = gql`
	subscription WatchEmote($id: ObjectID!) {
		emote(id: $id) {
			id
			created_at
			name
			lifecycle
			owner {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			flags
			versions {
				id
				name
				description
				created_at
				lifecycle
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
`;

export const GetEmoteChannels = gql`
	query GetEmoteChannels($id: ObjectID!, $page: Int, $limit: Int) {
		emote(id: $id) {
			id
			channels(page: $page, limit: $limit) {
				total
				items {
					id
					username
					display_name
					avatar_url
					tag_color
				}
			}
		}
	}
`;

export interface GetEmote {
	emote: Emote;
}
