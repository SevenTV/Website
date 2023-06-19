import { useStore } from "@/store/main";
import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import type { Role } from "@/structures/Role";
import { Permissions } from "@/structures/Role";
import { HasBits64 } from "@/structures/util/BitField";
import type { AuditLog } from "./Audit";
import type { Badge, Paint } from "./Cosmetic";

export interface User {
	id: string;
	type: "" | "BOT" | "SYSTEM";
	username: string;
	display_name: string;
	created_at: string | Date;
	style: User.Style;
	owned_emotes: Emote[];
	editors: User.Editor[];
	editor_of: User.Editor[];
	roles: string[];
	emote_sets: EmoteSet[];
	activity: AuditLog[];
	avatar_url: string;
	biography: string;
	token_version: number;
	connections: User.Connection[];
	cosmetics: User.Cosmetic[];
	inbox_unread_count: number;
}

export namespace User {
	export interface Style {
		color: number;
		badge_id?: string;
		paint_id?: string;
		badge?: Badge;
		paint?: Paint;
	}

	export interface Editor {
		id: string;
		connections: string[];
		permissions: number;
		visible: boolean;
		user?: User;
	}

	export const EditorPermission = {
		ModifyEmotes: 1 << 0, // 1 - Allows modifying emotes in the user's active emote sets
		UsePrivateEmotes: 1 << 1, // 2 - Allows using the user's private emotes
		ManageProfile: 1 << 2, // 4 - Allows managing the user's public profile
		ManageOwnedEmotes: 1 << 3, // 8 - Allows managing the user's owned emotes
		ManageEmoteSets: 1 << 4, // 16 - Allows managing the user's owned emote sets
		ManageBilling: 1 << 5, // 32 - Allows managing billing and payments, such as subscriptions
		ManageEditors: 1 << 6, // 64 - Allows adding or removing editors for the user
		ViewMessages: 1 << 7, // 128 - Allows viewing the user's private messages, such as inbox
	};

	export interface Connection {
		id: string;
		username: string;
		display_name: string;
		platform: Connection.Platform;
		linked_at: string | Date;
		emote_capacity: number;
		emote_set_id: string;
	}

	export interface Cosmetic {
		id: string;
		kind: string;
		selected: boolean;
	}

	export namespace Connection {
		export interface Data {
			id: string;
		}

		export type Platform = "TWITCH" | "YOUTUBE" | "DISCORD" | "KICK";

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

	export const GetRoles = (user: User | null): Role[] => {
		if (!user) {
			return [];
		}

		const roles = useStore().roles;
		const uRoles = [] as Role[];
		for (const roleID of user.roles ?? []) {
			const role = roles[roleID];
			if (!role) {
				continue;
			}
			uRoles.push(role);
		}
		return uRoles;
	};

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

		const roles = useStore().roles;
		let total = 0n as Role.Permission;
		for (const roleID of user.roles ?? []) {
			const role = roles[roleID];
			if (!role) {
				continue;
			}
			const a = BigInt(role.allowed);

			total |= a;
		}
		for (const roleID of user.roles ?? []) {
			const role = roles[roleID];
			if (!role) {
				continue;
			}
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
		const roles = useStore().roles;
		const aRoles = [] as Role[];
		for (const roleID of actor.roles ?? []) {
			const role = roles[roleID];
			if (!role) {
				continue;
			}
			aRoles.push(role);
		}
		const vRoles = [] as Role[];
		for (const roleID of victim.roles ?? []) {
			const role = roles[roleID];
			if (!role) {
				continue;
			}
			vRoles.push(role);
		}

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
			Permissions.ManageCosmetics,
			Permissions.ManageNews,
			Permissions.ManageRoles,
			Permissions.EditAnyEmote,
			Permissions.EditAnyEmoteSet,
		]
			.map((bit) => HasPermission(user, bit))
			.filter((b) => b === true).length > 0;

	export function getStyledPlatformName(p: Connection.Platform): string {
		switch (p) {
			case "TWITCH":
				return "Twitch";
			case "YOUTUBE":
				return "YouTube";
			case "DISCORD":
				return "Discord";

			default:
				return "";
		}
	}
}
