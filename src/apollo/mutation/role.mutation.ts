import gql from "graphql-tag";
import { Role } from "@/structures/Role";

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

export const EditRole = gql`
	mutation EditRole($id: ObjectID!, $data: EditRoleInput!) {
		editRole(role_id: $id, data: $data) {
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

export interface EditRole {
	editRole: Role;
}

export const DeleteRole = gql`
	mutation DeleteRole($role_id: ObjectID!) {
		deleteRole(role_id: $role_id)
	}
`;

export interface DeleteRole {
	deleteRole: string;
}
