import type { Emote } from "@/structures/Emote";
import type { Role } from "@/structures/Role";
import type { Notification } from "@/structures/Notification";

export interface User {
	role: Role;
	emotes: Emote[];
	emote_ids: string[];
	emote_aliases: string[][];
	owned_emotes: Emote[];
	broadcaster_type: string;
	description: string;
	display_name: string;
	editor_ids: string;
	editor_in: User[];
	editors: User[];
	id: string;
	login: string;
	offline_image_url: string;
	profile_image_url: string;
	type: string;
	view_count: number;
	email: string;
	created_at: string | Date;
	token_version?: string;
	banned?: boolean;
	emote_slots: number;
	follower_count: number;
	notification_count: number;
	notifications: Notification[];
}
