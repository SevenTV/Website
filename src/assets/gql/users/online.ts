import gql from "graphql-tag";

export const OnlineUsers = gql`
	query GetOnlineStaff {
		onlineUsers {
			id
			username
			display_name
			tag_color
			avatar_url
		}
	}
`;
