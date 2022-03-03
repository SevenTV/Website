import { Emote } from "@/structures/Emote";
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
			images {
				name
				format
				url
				width
				height
			}
			versions {
				id
				name
				timestamp
			}
			animated
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
			images {
				name
				format
				url
				width
				height
			}
			animated
		}
	}
`;

export const GetEmoteStatusOnly = gql`
	query GetEmoteStatusOnly($id: String!) {
		emote(id: $id) {
			id
			lifecycle
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
