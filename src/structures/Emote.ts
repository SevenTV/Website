import type { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";
import { Common } from "./Common";

export interface Emote {
	id: string;
	name: string;
	owner: User;
	owner_id: string;
	flags: number;
	channel_count: number;
	channels: Emote.UserList;
	mime: string;
	lifecycle: Emote.Lifecycle;
	tags: string[];
	created_at: string | Date;
	provider: Emote.Provider;
	images: Common.Image[];
	height: number[];
	width: number[];
	parent_id: string;
	versions: Emote.Version[];
	animated: boolean;
}

export namespace Emote {
	export interface Version {
		id: string;
		name: string;
		description: string;
		diverged?: boolean;
		timestamp: string | Date;
	}

	export const IsPrivate = (emote: Emote) => HasBits(emote.flags || 0, Flags.PRIVATE);

	export const IsUnlisted = (emote: Emote) => !HasBits(emote.flags || 0, Flags.LISTED);

	export const IsZeroWidth = (emote: Emote) => HasBits(emote.flags || 0, Flags.ZERO_WIDTH);

	export const GetUrl = (emote: Emote, format: Common.Image.Format, size: Size): string => {
		if (!emote || !Array.isArray(emote.images)) {
			return "";
		}
		return (
			"https:" + emote.images.filter((img) => img.format === format)[parseInt(size.slice(0, 1)) - 1]?.url ?? ""
		);
	};

	export type Size = "1x" | "2x" | "3x" | "4x";

	export enum Flags {
		PRIVATE = 1 << 0,
		LISTED = 1 << 1,
		ZERO_WIDTH = 1 << 8,
	}

	export enum Lifecycle {
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
