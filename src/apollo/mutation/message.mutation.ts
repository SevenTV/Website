import gql from "graphql-tag";

export const ReadMessages = gql`
	mutation ReadMessages($ids: [ObjectID!]!, $read: Boolean!) {
		readMessages(message_ids: $ids, read: $read)
	}
`;

export interface ReadMessages {
	readMessages: number;
}

export const SendInboxMessage = gql`
	mutation SendInboxMesage(
		$recipients: [ObjectID!]!
		$subject: String!
		$content: String!
		$important: Boolean
		$anonymous: Boolean
	) {
		sendInboxMessage(
			recipients: $recipients
			subject: $subject
			content: $content
			important: $important
			anonymous: $anonymous
		) {
			id
			kind
			created_at
			author {
				id
				username
			}
		}
	}
`;
