import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $page: Int, $limit: Int, $sort: Sort) {
		emotes(query: $query, page: $page, limit: $limit, sort: $sort) {
			id
			name
			owner {
				id
				username
				display_name
				tag_color
			}
			flags
			links
		}
	}
`;

export interface SearchEmotes {
	emotes: Emote[];
	metadata: {
		emotes: {
			count: number;
		};
	};
}
