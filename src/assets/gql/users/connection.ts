import { User } from "@structures/User";
import gql from "graphql-tag";

export const UpdateUserConnection = gql`
	mutation UpdateUserConnection($id: ObjectID!, $conn_id: String!, $d: UserConnectionUpdate!) {
		user(id: $id) {
			connections(id: $conn_id, data: $d) {
				id
				platform
				display_name
				emote_set_id
			}
		}
	}
`;

export namespace UpdateUserConnection {
	export interface Result {
		user: User;
	}
	export interface Variables {
		id: string;
		conn_id: string;
		d: {
			emote_set_id?: string;
		};
	}
}
