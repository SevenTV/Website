import { DataStructure } from "@typings/typings/DataStructure";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!) {
		search_emotes(query: $query) {
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
