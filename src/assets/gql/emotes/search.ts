import { DataStructure } from "@typings/typings/DataStructure";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes(
		$query: String!
		$page: Int
		$pageSize: Int
		$globalState: String
		$sortBy: String
		$sortOrder: Int
		$channel: String
		$submitted_by: String
		$filter: EmoteFilter
	) {
		search_emotes(
			query: $query
			limit: $pageSize
			page: $page
			pageSize: $pageSize
			globalState: $globalState
			sortBy: $sortBy
			sortOrder: $sortOrder
			channel: $channel
			submitted_by: $submitted_by
			filter: $filter
		) {
			id
			visibility
			provider
			urls
			owner {
				id
				display_name
				role {
					id
					name
					color
				}
			}
			name
		}
	}
`;

export interface SearchEmotes {
	search_emotes: DataStructure.Emote[];
	total_estimated_size: number;
}
