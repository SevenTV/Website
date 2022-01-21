import type { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";

export interface Emote {
	id: string;
	name: string;
	owner: User;
	owner_id: string;
	visibility: number;
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

export const IsGlobal = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.GLOBAL);

export const IsPrivate = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.PRIVATE);

export const IsUnlisted = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.HIDDEN);

export const IsZeroWidth = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.ZERO_WIDTH);

export const GetUrl = (emote: Emote, size: EmoteSize): string => {
	if (!Array.isArray(emote.urls)) {
		return "";
	}
	return "https:" + emote.urls[parseInt(size.slice(0, 1)) - 1];
};

export type EmoteSize = "1x" | "2x" | "3x" | "4x";

export enum Visibility {
	PRIVATE = 1 << 0,
	GLOBAL = 1 << 1,
	HIDDEN = 1 << 2,
	OVERRIDE_BTTV = 1 << 3,
	OVERRIDE_FFZ = 1 << 4,
	OVERRIDE_TWITCH_GLOBAL = 1 << 5,
	OVERRIDE_TWITCH_SUBSCRIBER = 1 << 6,
	ZERO_WIDTH = 1 << 7,
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
