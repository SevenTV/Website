import gql from "graphql-tag";

export const SendInboxMessage = gql`
	mutation SendInboxMesage(
		$recipients: [String!]!
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
			data
		}
	}
`;
