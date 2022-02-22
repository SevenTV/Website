import { EmoteSet } from "@/structures/EmoteSet";
import gql from "graphql-tag";

export const CreateEmoteSet = gql`
	mutation CreateEmoteSet($data: CreateEmoteSetInput!) {
		createEmoteSet(data: $data) {
			id
			name
			owner {
				id
				username
				display_name
			}
			emotes {
				id
			}
		}
	}
`;

export namespace CreateEmoteSet {
	export interface Result {
		createEmoteSet: EmoteSet;
	}
	export interface Variables {
		data: {
			name: string;
		};
	}
}
