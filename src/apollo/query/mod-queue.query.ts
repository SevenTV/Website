import gql from "graphql-tag";
import { Message } from "@/structures/Message";

export const GetModRequests = gql`
	query GetModRequests($after: ObjectID, $limit: Int, $wish: String) {
		modRequests(after_id: $after, limit: $limit, wish: $wish) {
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
		after: string | null;
		limit: number;
		wish?: string;
	}
	export interface Result {
		modRequests: {
			total: number;
			messages: Message.ModRequest[];
		};
	}
}
