import { Message } from "@/structures/Message";
import gql from "graphql-tag";

export const GetInboxMessages = gql`
	query GetInboxMessages {
		inbox {
			id
			kind
			data
		}
	}
`;

export interface GetInboxMessages {
	inbox: Message<Message.Inbox>[];
}
