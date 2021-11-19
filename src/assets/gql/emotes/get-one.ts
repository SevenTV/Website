import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const GetOneEmote = gql`
	query GetOneEmote($id: String!) {
		emote(id: $id) {
			id
			name
			owner {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			flags
			links
		}
	}
`;

export interface GetOneEmote {
	emote: Emote;
}
