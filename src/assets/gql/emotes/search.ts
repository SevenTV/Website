import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $page: Int, $limit: Int) {
		emotes(query: $query, page: $page, limit: $limit) {
			count
			items {
				id
				name
				owner {
					id
					username
					display_name
					tag_color
				}
				flags
				urls
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
