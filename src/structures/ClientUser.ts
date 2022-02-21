import { Emote } from "./Emote";
import { EmoteSet } from "./EmoteSet";
import { Role } from "./Role";
import { User } from "./User";

export class ClientUser implements User {
	id: string;
	user_type: "" | "BOT" | "SYSTEM";
	username: string;
	display_name: string;
	created_at: string | Date;
	discriminator: string;
	email: string;
	tag_color: number;
	owned_emotes: Emote[];
	editors: User.Editor[];
	roles: Role[];
	emote_sets: EmoteSet[];
	avatar_url: string;
	biography: string;
	token_version: number;
	connections: User.Connection[];
	inbox_unread_count: number;

	constructor(user: User) {
		this.id = user.id;
		this.user_type = user.user_type;
		this.username = user.username;
		this.display_name = user.display_name;
		this.created_at = user.created_at;
		this.discriminator = user.discriminator;
		this.email = user.email;
		this.tag_color = user.tag_color;
		this.owned_emotes = user.owned_emotes ?? [];
		this.editors = user.editors ?? [];
		this.roles = user.roles ?? [];
		this.emote_sets = user.emote_sets ?? [];
		this.avatar_url = user.avatar_url ?? [];
		this.biography = user.biography ?? [];
		this.token_version = user.token_version ?? 0;
		this.connections = user.connections ?? [];
		this.inbox_unread_count = user.inbox_unread_count ?? 0;
	}
}
