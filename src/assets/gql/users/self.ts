import { EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import gql from "graphql-tag";
import { UserFragment, UserPartialFragment } from "./user";

export const GetCurrentUser = gql`
	query GetCurrentUser {
		user: currentUser {
			...USER_FRAGMENT
		}
	}
	${UserFragment}
`;

export const WatchCurrentUser = gql`
	subscription WatchCurrentUser {
		user: currentUser {
			...USER_PARTIAL_FRAGMENT
		}
	}
	${UserPartialFragment}
`;

export const GetClientRequiredData = gql`
	query ClientRequiredData {
		globalEmoteSet: namedEmoteSet(name: GLOBAL) {
			id
			name
			emotes {
				id
				name
				flags
			}
			emote_slots
		}
	}
`;

export interface ClientRequiredData {
	clientUser: User;
	globalEmoteSet: EmoteSet;
}
