import { Message } from "@/structures/Message";
import gql from "graphql-tag";

export const GetModRequests = gql`
	query GetModRequests($after: ObjectID, $limit: Int) {
		modRequests(after_id: $after, limit: $limit) {
			total
			messages {
				id
				kind
				created_at
				author_id
				target_id
				target_kind
				read
			}
		}
	}
`;

export namespace GetModRequests {
	export interface Variables {
		after: string | null;
		limit: number;
	}
	export interface Result {
		modRequests: {
			total: number;
			messages: Message.ModRequest[];
		};
	}
}
