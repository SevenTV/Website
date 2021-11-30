import { Message } from "@/structures/Message";
import gql from "graphql-tag";

export const GetInboxMessages = gql`
	query GetInboxMessages {
		inbox {
			id
			kind
			created_at
			data
			read
			author {
				id
				username
				display_name
				tag_color
				avatar_url
				roles {
					id
					name
					color
					allowed
					denied
					position
				}
			}
		}
	}
`;

export interface GetInboxMessages {
	inbox: Message<Message.Inbox>[];
}
