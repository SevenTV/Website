import { ListItemAction } from "@/structures/Common";
import gql from "graphql-tag";

export const UpdateUserRoles = gql`
	mutation UpdateUserRoles($user_id: ObjectID!, $role_id: ObjectID!, $action: ListItemAction!) {
		user(id: $user_id) {
			roles(role_id: $role_id, action: $action)
		}
	}
`;

export namespace UpdateUserRoles {
	export interface Variables {
		user_id: string;
		role_id: string;
		action: ListItemAction;
	}

	export interface Result {
		user: {
			roles: string[];
		};
	}
}
