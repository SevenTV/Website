import type { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";
import type { ImageHost } from "@/structures/Common";
import { AuditLog } from "@/structures/Audit";

export interface Emote {
	id: string;
	name: string;
	owner: User | null;
	owner_id: string;
	flags: number;
	channel_count: number;
	channels: Emote.UserList;
	activity: AuditLog[];
	mime: string;
	lifecycle: Emote.Lifecycle;
	tags: string[];
	created_at: string | Date;
	provider: Emote.Provider;
	host: ImageHost;
	height: number[];
	width: number[];
	parent_id: string;
	trending?: number | null;
	versions: EmoteVersion[];
	states: EmoteVersionState[];
	common_names: Emote.CommonName[];
	animated: boolean;
}

export interface EmoteVersion {
	id: string;
	name: string;
	description: string;
	states: EmoteVersionState[];
	host: ImageHost;
	lifecycle: Emote.Lifecycle;
	error?: string | null;
	created_at: string | Date;
}

export type EmoteVersionState = "LISTED" | "ALLOW_PERSONAL";

export namespace Emote {
	export interface CommonName {
		name: string;
		count: number;
	}

	export const IsPrivate = (emote: Emote) => HasBits(emote.flags || 0, Flags.PRIVATE);

	export const IsZeroWidth = (emote: Emote) => HasBits(emote.flags || 0, Flags.ZERO_WIDTH);

	export const GetCurrentVersion = (emote: Emote): EmoteVersion | null =>
		emote?.versions?.filter((ver) => emote && ver.id === emote.id)[0] ?? null;

	export type Size = "1x" | "2x" | "3x" | "4x";

	export enum Flags {
		PRIVATE = 1 << 0,
		LISTED = 1 << 1,
		ZERO_WIDTH = 1 << 8,
		PERSONAL_USE = 1 << 9,
		PERSONAL_USE_REJECTED = 1 << 10,
	}

	export enum Lifecycle {
		FAILED = -2,
		DELETED = -1,
		PROCESSING = 0,
		PENDING = 1,
		DISABLED = 2,
		LIVE = 3,
	}

	export enum Provider {
		SevenTV = "7TV",
		Twitch = "TWITCH",
		BTTV = "BTTV",
		FFZ = "FFZ",
		EMOJI = "EMOJI",
	}

	export interface UserList {
		total: number;
		items: User[];
	}
}
