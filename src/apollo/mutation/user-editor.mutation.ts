import { User } from "@/structures/User";
import gql from "graphql-tag";

export const UpdateUserEditors = gql`
	mutation UpdateUserEditors($id: ObjectID!, $editor_id: ObjectID!, $d: UserEditorUpdate!) {
		user(id: $id) {
			editors(editor_id: $editor_id, data: $d) {
				id
				visible
				user {
					id
					username
					display_name
					style {
						color
					}
					roles
					avatar_url
				}
				added_at
				permissions
			}
		}
	}
`;

export namespace UpdateUserEditors {
	export interface Variables {
		id: string;
		editor_id: string;
		d: {
			permissions?: number;
			visible?: boolean;
		};
	}

	export interface Result {
		user: {
			editors: User.Editor[];
		};
	}
}
