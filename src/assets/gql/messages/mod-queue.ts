import { Message } from "@structures/Message";
import gql from "graphql-tag";

export const GetModRequests = gql`
	query GetModRequests($after: ObjectID) {
		mod_requests(after_id: $after) {
			id
			kind
			created_at
			author {
				id
				display_name
				tag_color
			}
			target_id
			target_kind
		}
	}
`;

export namespace GetModRequests {
	export interface Variables {
		after: string;
	}
	export interface Result {
		mod_requests: Message.ModRequest[];
	}
}
