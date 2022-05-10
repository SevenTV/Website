import { Role } from "@structures/Role";
import gql from "graphql-tag";

export const GetRoles = gql`
	query GetRoles {
		roles {
			id
			name
			position
			color
			allowed
			denied
		}
	}
`;

export const GetRole = gql`
	query GetRole($id: String!) {
		role(id: $id) {
			id
			name
			position
			color
			allowed
			denied
		}
	}
`;

export interface GetRoles {
	roles: Role[];
}

export interface GetRole {
	role: Role;
}
