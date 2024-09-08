import gql from "graphql-tag";
import { Message } from "@/structures/Message";

export const GetModRequests = gql`
	query GetModRequests($page: Int, $limit: Int, $wish: String, $country: String) {
		modRequests(page: $page, limit: $limit, wish: $wish, country: $country) {
			total
			messages {
				id
				kind
				created_at
				author_id
				target_id
				target_kind
				read
				wish
				actor_country_name
				actor_country_code
			}
		}
	}
`;

export namespace GetModRequests {
	export interface Variables {
		page?: number | null;
		limit?: number | null;
		wish?: string | null;
	}
	export interface Result {
		modRequests: {
			total: number;
			messages: Message.ModRequest[];
		};
	}
}
