import type { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";

export interface Emote {
	id: string;
	name: string;
	owner?: User;
	owner_id?: string;
	visibility: number;
	channel_count?: number;
	channels?: Partial<User>[];
	mime?: string;
	status: Status;
	tags: string[];
	created_at?: string | Date;
	provider?: Provider;
	links?: [string, string][];
	height?: number[];
	width?: number[];
}

export const IsGlobal = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.GLOBAL);

export const IsPrivate = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.PRIVATE);

export const IsUnlisted = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.HIDDEN);

export const IsZeroWidth = (emote: Emote) => HasBits(emote.visibility || 0, Visibility.ZERO_WIDTH);

export const GetUrl = (emote: Emote, size: EmoteSize) => {
	const url = emote.links?.filter((url) => url[0] === size)[0];

	if (Array.isArray(url) && typeof url[1] === "string") {
		return url[1];
	}
	return null;
};

export type EmoteSize = "1" | "2" | "3" | "4";

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
