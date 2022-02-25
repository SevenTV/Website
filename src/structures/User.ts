import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "./EmoteSet";
import type { Role } from "@/structures/Role";
import { Permissions } from "@/structures/Role";
import { HasBits64 } from "./util/BitField";

export interface User {
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
	editor_of: User.Editor[];
	roles: Role[];
	emote_sets: EmoteSet[];
	avatar_url: string;
	biography: string;
	token_version: number;
	connections: User.Connection[];
	inbox_unread_count: number;
}

export namespace User {
	export interface Emote {
		connections: string[];
		alias: string;
		emote: Emote;
	}

	export interface Editor {
		id: string;
		connections: string[];
		permissions: number;
		visible: boolean;
		user?: User;
	}

	export interface Connection {
		id: string;
		display_name: string;
		platform: string;
		linked_at: string | Date;
		emote_slots: number;
		emote_set_id: string;
	}

	export namespace Connection {
		export interface Data {
			id: string;
		}

		export interface Twitch extends Data {
			login: string;
			display_name: string;
			broadcaster_type: string;
			description: string;
			profile_image_url: string;
			offline_image_url: string;
			view_count: number;
			email: string;
			created_at?: string | Date;
		}

		export interface YouTube extends Data {
			title: string;
			description: string;
		}
	}

	export type UserConnectionPlatform = "TWITCH" | "YOUTUBE" | "DISCORD";

	/**
	 * Check if a user has a specific permission
	 *
	 * @param user the user to check
	 * @param bit the permission bit to test
	 * @returns whether or not the user has the permission
	 */
	export const HasPermission = (user: User | null | undefined, bit: Role.Permission): boolean => {
		if (!user) {
			return false;
		}

		let total = 0n as Role.Permission;
		for (const role of user.roles ?? []) {
			const a = BigInt(role.allowed);

			total |= a;
		}
		for (const role of user.roles ?? []) {
			const d = BigInt(role.denied);

			total &= ~d;
		}

		if ((total & Permissions.SuperAdministrator) == Permissions.SuperAdministrator) {
			return true;
		}
		return HasBits64(total, bit);
	};

	/**
	 * Compare two users for whether an actor has privileges against a victim.
	 *
	 * @param actor the actor user
	 * @param victim the victim user
	 * @returns whether the actor user has a higher privilege level than the victim
	 */
	export const ComparePrivilege = (actor: User, victim: User): boolean => {
		const aRoles = actor.roles ?? [];
		const vRoles = victim.roles ?? [];

		const aPosition = Math.max(...aRoles.map((r) => r.position ?? 0), 0);
		const vPosition = Math.max(...vRoles.map((r) => r.position ?? 0), 0);

		return aPosition > vPosition;
	};

	/**
	 * Check if a user is considered privileged, meaning they have
	 * at least one elevated "mod" or "admin" permission
	 *
	 * @param user
	 * @returns
	 */
	export const IsPrivileged = (user: User): boolean =>
		[
			// Check for any admin/mod permission for admin access
			Permissions.ManageBans,
			Permissions.ManageReports,
			Permissions.ManageNews,
			Permissions.ManageRoles,
			Permissions.EditAnyEmote,
			Permissions.EditAnyEmoteSet,
		]
			.map((bit) => HasPermission(user, bit))
			.filter((b) => b === true).length > 0;
}
