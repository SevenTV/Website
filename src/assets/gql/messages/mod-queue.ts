import { Message } from "@structures/Message";
import gql from "graphql-tag";

export const GetModRequests = gql`
	query GetModRequests($after: ObjectID) {
		modRequests(after_id: $after) {
			id
			kind
			created_at
			author_id
			target_id
			target_kind
		}
	}
`;

export namespace GetModRequests {
	export interface Variables {
		after: string | null;
	}
	export interface Result {
		modRequests: Message.ModRequest[];
	}
}
