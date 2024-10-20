import gql from "graphql-tag";
import { Emote } from "@/structures/Emote";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {
		emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {
			count
			max_page
			items {
				id
				name
				state
				trending
				owner {
					id
					username
					display_name
					style {
						color
						paint_id
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
		max_page: number;
		items: Emote[];
	};
}
