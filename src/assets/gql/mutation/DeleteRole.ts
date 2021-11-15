import gql from "graphql-tag";

export const DeleteRole = gql`
	mutation DeleteRole($role_id: String!) {
		deleteRole(role_id: $role_id)
	}
`;

export interface DeleteRole {
	deleteRole: string;
}
