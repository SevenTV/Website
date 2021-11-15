import { Role } from "@/structures/Role";
import gql from "graphql-tag";

export const CreateRole = gql`
	mutation CreateRole($data: CreateRoleInput!) {
		createRole(data: $data) {
			id
			name
			color
			allowed
			denied
			position
		}
	}
`;

export interface CreateRole {
	createRole: Role;
}
