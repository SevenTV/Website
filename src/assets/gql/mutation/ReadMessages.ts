import gql from "graphql-tag";

export const ReadMessages = gql`
	mutation ReadMessages($ids: [String!]!, $read: Boolean) {
		readMessages(message_ids: $ids, read: $read)
	}
`;

export interface ReadMessages {
	readMessages: number;
}
