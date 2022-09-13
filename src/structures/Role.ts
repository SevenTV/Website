export interface Role {
	id: string;
	name: string;
	color: number;
	allowed: bigint | string;
	denied: bigint | string;
	position: number;
	invisible: boolean;
	default?: boolean;
}

export namespace Role {
	export type Permission = bigint;
}

// Emotes
// Range: 1 << 1 - 1 << 5
export const Permissions = {
	CreateEmote: (1n << 0n) as Role.Permission, // 1 - Allows creating emotes
	EditEmote: (1n << 1n) as Role.Permission, // 2 - Allows editing / creating new versions of an emote
	CreateEmoteSet: (1n << 2n) as Role.Permission, // 4 - Allows creating emote sets
	EditEmoteSet: (1n << 3n) as Role.Permission, // 8 - Allows modifying emote sets

	// Unused Space
	// Range: 1 << 6 - 1 << 12

	// User / Misc / Special
	// Range: 1 << 13 - 1 << 1 << 29
	CreateReport: (1n << 13n) as Role.Permission, // 8192 - Allows creating reports
	SendMessages: (1n << 14n) as Role.Permission, // 16384 - Allows sending messages (i.e comments or user inboxs)
	UseZeroWidthEmoteType: (1n << 23n) as Role.Permission, // 8388608 - Allows using the Zero-Width emote type
	AnimateProfilePicture: (1n << 24n) as Role.Permission, // 16777216 - Allows the user's profile picture to be animated

	// Moderation
	// Range: 1 << 30 - 1 << 53
	ManageBans: (1n << 30n) as Role.Permission, // 1073741824 - (Mod) Allows creating or deleting bans
	ManageRoles: (1n << 31n) as Role.Permission, // 2147483648 - (Mod) Allows creating, deleting and assigning roles to users
	ManageReports: (1n << 32n) as Role.Permission, // 4294967296 - (Mod) Allows managing reports
	ManageUsers: (1n << 33n) as Role.Permission, // 8589934592 - (Mod) Allows managing users
	EditAnyEmote: (1n << 41n) as Role.Permission, // 2199023255552 - (Mod) Allows editing any emote
	EditAnyEmoteSet: (1n << 42n) as Role.Permission, // 4398046511104 - (Mod) Allows editing any emote set, unless it is a privileged set
	BypassPrivacy: (1n << 48n) as Role.Permission, // 281474976710656 - (Mod) Lets the user see all non-public content

	// Administration
	// Range: 1 << 54 - 1 << 62
	SuperAdministrator: (1n << 62n) as Role.Permission, // 9223372036854775808 - (Admin) GRANTS EVERY PERMISSION /!\
	ManageContent: (1n << 54n) as Role.Permission, // 18014398509481984 - (Admin) Allows managing featured content or publish items of significance
	ManageStack: (1n << 55n) as Role.Permission, // 36028797018963968 - (Admin) Allows managing the application stack
	ManageCosmetics: (1n << 56n) as Role.Permission, // 72057594037927936 - (Admin) Allows managing cosmeics
};
