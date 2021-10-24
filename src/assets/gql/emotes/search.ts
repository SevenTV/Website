import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $after: String, $limit: Int) {
		emotes(query: $query, after_id: $after, limit: $limit) {
			id
			name
			owner {
				id
				username
				display_name
				tag_color
			}
			visibility
			links
			width
			height
		}
	}
`;

export interface SearchEmotes {
	emotes: Emote[];
	metadata: {
		emotes: {
			total: number;
		};
	};
}
