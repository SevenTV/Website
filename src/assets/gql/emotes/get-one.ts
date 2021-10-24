import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const GetOneEmote = gql`
	query GetOneEmote($id: String!) {
		emote(id: $id) {
			id
			name
			width
			height
			owner {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			visibility
			links
		}
	}
`;

export interface GetOneEmote {
	emote: Emote;
}
