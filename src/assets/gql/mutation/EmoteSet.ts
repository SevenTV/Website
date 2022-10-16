import { EmoteSet } from "@structures/EmoteSet";
import gql from "graphql-tag";

export const CreateEmoteSet = gql`
	mutation CreateEmoteSet($user_id: ObjectID!, $data: CreateEmoteSetInput!) {
		createEmoteSet(user_id: $user_id, data: $data) {
			id
			name
			capacity
			owner {
				id
				display_name
				style {
					color
				}
				avatar_url
			}
			emotes {
				id
				name
			}
		}
	}
`;

export namespace CreateEmoteSet {
	export interface Result {
		createEmoteSet: EmoteSet;
	}
	export interface Variables {
		user_id: string;
		data: {
			name: string;
		};
	}
}

export const UpdateEmoteSet = gql`
	mutation DeleteEmoteSet($id: ObjectID!, $data: UpdateEmoteSetInput!) {
		emoteSet(id: $id) {
			update(data: $data) {
				id
				name
			}
		}
	}
`;

export namespace UpdateEmoteSet {
	export interface Result {
		emoteSet: {
			update: EmoteSet;
		};
	}

	export interface Variables {
		id: string;
		data: Partial<{
			name: string;
			capacity: number;
		}>;
	}
}

export const DeleteEmoteSet = gql`
	mutation DeleteEmoteSet($id: ObjectID!) {
		emoteSet(id: $id) {
			delete
		}
	}
`;

export namespace DeleteEmoteSet {
	export interface Result {
		emoteSet: {
			delete: boolean;
		};
	}

	export interface Variables {
		id: string;
	}
}
