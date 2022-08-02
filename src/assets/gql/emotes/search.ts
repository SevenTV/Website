import { Emote } from "@structures/Emote";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $page: Int, $limit: Int, $filter: EmoteSearchFilter) {
		emotes(query: $query, page: $page, limit: $limit, filter: $filter) {
			count
			items {
				id
				name
				listed
				owner {
					id
					username
					display_name
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
			}
		}
	}
`;

export interface SearchEmotes {
	emotes: {
		count: number;
		items: Emote[];
	};
}
