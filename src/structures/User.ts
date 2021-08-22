import { Emote } from "@/structures/Emote";
import { Role } from "@/structures/Role";

export class User {
	get id(): string {
		return this.data.id;
	}

	constructor(public data: User.Type) {}

	update(data: Partial<User.Type>): void {
		this.data = {
			...this.data,
			...data,
		};
	}

	getDisplayName(): string {
		return this.data.display_name;
	}

	getLogin(): string {
		return this.data.login;
	}

	getRoleColor(): string {
		return "#" + (this.data.role?.color ?? 0).toString(16);
	}

	getAvatarURL(): string {
		return this.data.profile_image_url;
	}

	static Create(data: User.Type): User {
		return new User(data);
	}
}

export namespace User {
	export interface Type {
		role: Role.Type;
		emotes: Emote.Type[];
		emote_ids: string[];
		emote_aliases: string[][];
		owned_emotes: Emote.Type[];
		broadcaster_type: string;
		description: string;
		display_name: string;
		editor_ids: string;
		editor_in: Type[];
		editors: Type[];
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
}
