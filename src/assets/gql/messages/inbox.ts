import { Message } from "@/structures/Message";
import gql from "graphql-tag";

export const GetInboxMessages = gql`
	query GetInboxMessages($user_id: ObjectID!) {
		inbox(user_id: $user_id) {
			id
			kind
			created_at
			subject
			content
			important
			starred
			pinned
			placeholders
			read
			author_id
		}
	}
`;

export interface GetInboxMessages {
	inbox: Message.Inbox[];
}
