import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {
		emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {
			count
			items {
				id
				name
				listed
				trending
				owner {
					id
					username
					display_name
					style {
						color
					}
				}
				flags
				host {
					url
					files {
						name
						format
						width
						height
					}
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
