import type { User } from "@/structures/User";

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
	urls?: [string, string][];
	height?: number[];
	width?: number[];
}

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
