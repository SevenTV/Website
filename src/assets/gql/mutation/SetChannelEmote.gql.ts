import { User } from "@/structures/User";
import gql from "graphql-tag";

export const SetChannelEmote = gql`
	mutation SetChannelEmote($user_id: String!, $target: UserEmoteInput!, $action: ListItemAction!) {
		setChannelEmote(user_id: $user_id, target: $target, action: $action) {
			id
			channel_emotes {
				emote {
					id
					name
				}
			}
		}
	}
`;

export interface SetChannelEmote {
	setChannelEmote: User;
}
