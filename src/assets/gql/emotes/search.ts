import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const SearchEmotes = gql`
	query SearchEmotes($query: String!, $after: String, $limit: Int) {
		emotes(query: $query, after_id: $after, limit: $limit) {
			id
			name
			urls
		}
	}
`;

export interface SearchEmotes {
	emotes: Emote.Type[];
	metadata: {
		emotes: {
			total: number;
		};
	};
}
