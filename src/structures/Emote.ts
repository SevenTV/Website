import type { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";

export interface Emote {
	id: string;
	name: string;
	owner: User;
	owner_id: string;
	flags: number;
	channel_count: number;
	channels: Partial<User>[];
	mime: string;
	status: Status;
	tags: string[];
	created_at: string | Date;
	provider: Provider;
	urls: string[];
	height: number[];
	width: number[];
	parent_id: string;
	versioning: EmoteVersioning;
	animated: boolean;
}

export interface EmoteVersioning {
	tag: string;
	description: string;
	diverged?: boolean;
	timestamp: string | Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IsGlobal = (_: Emote) => false;

export const IsPrivate = (emote: Emote) => HasBits(emote.flags || 0, Flags.PRIVATE);

export const IsUnlisted = (emote: Emote) => !HasBits(emote.flags || 0, Flags.LISTED);

export const IsZeroWidth = (emote: Emote) => HasBits(emote.flags || 0, Flags.ZERO_WIDTH);

export const GetUrl = (emote: Emote, size: EmoteSize): string => {
	if (!Array.isArray(emote.urls)) {
		return "";
	}
	return "https:" + emote.urls[parseInt(size.slice(0, 1)) - 1];
};

export type EmoteSize = "1x" | "2x" | "3x" | "4x";

export enum Flags {
	PRIVATE = 1 << 0,
	LISTED = 1 << 1,
	ZERO_WIDTH = 1 << 8,
}

export enum Status {
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
