import { User } from "@/structures/User";
import gql from "graphql-tag";

export const GetUser = gql`
	query GetUser($id: String!) {
		user(id: $id) {
			id
			username
			display_name
			avatar_url
			tag_color
		}
	}
`;

export interface GetUser {
	user: User;
}
