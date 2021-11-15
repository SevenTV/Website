export interface Role {
	id: string;
	name: string;
	color: number;
	allowed: bigint;
	denied: bigint;
	position: number;
}

export type RolePermission = bigint;

// Emotes
// Range: 1 << 1 - 1 << 12
export const RolePermissions = {
	CreateEmote: (1n << 0n) as RolePermission, // 1 - Allows creating emotes
	EditEmote: (1n << 1n) as RolePermission, // 2 - Allows editing / creating new versions of an emote
	SetChannelEmote: (1n << 2n) as RolePermission, // 4 - Allows adding or removing channel emotes

	// User / Misc / Special
	// Range: 1 << 13 - 1 << 1 << 29
	ReportCreate: (1n << 13n) as RolePermission, // 8192 - Allows creating reports
	UseZeroWidthEmoteType: (1n << 23n) as RolePermission, // 8388608 - Allows using the Zero-Width emote type
	AnimateProfilePicture: (1n << 24n) as RolePermission, // 16777216 - Allows the user's profile picture to be animated

	// Moderation
	// Range: 1 << 30 - 1 << 53
	ManageBans: (1n << 30n) as RolePermission, // 1073741824 - (Mod) Allows creating or deleting bans
	ManageRoles: (1n << 31n) as RolePermission, // 2147483648 - (Mod) Allows creating, deleting and assigning roles to users
	ManageReports: (1n << 32n) as RolePermission, // 4294967296 - (Mod) Allows managing reports
	EditAnyEmote: (1n << 41n) as RolePermission, // 2199023255552 - (Mod) Allows editing any emote
	EditAnyEmoteSet: (1n << 42n) as RolePermission, // 4398046511104 - (Mod) Allows editing any emote set, unless it is a privileged set

	// Administration
	// Range: 1 << 54 - 1 << 62
	SuperAdministrator: (1n << 62n) as RolePermission, // 4611686018427387904 - (Admin) GRANTS EVERY PERMISSION /!\
	ManageNews: (1n << 54n) as RolePermission, // 18014398509481984 - (Admin) Allows creating and editing news
	ManageStack: (1n << 55n) as RolePermission, // 36028797018963968 - (Admin) Allows managing the application stack
};
