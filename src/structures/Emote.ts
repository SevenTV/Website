import type { User } from "@structures/User";
import { HasBits } from "@structures/util/BitField";
import { Common } from "@structures/Common";

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
	listed: boolean;
	versions: Emote.Version[];
	common_names: Emote.CommonName[];
	animated: boolean;
}

export namespace Emote {
	export interface Version {
		id: string;
		name: string;
		description: string;
		listed: boolean;
		images: Common.Image[];
		lifecycle: Emote.Lifecycle;
		created_at: string | Date;
	}

	export interface CommonName {
		name: string;
		count: number;
	}

	export const IsPrivate = (emote: Emote) => HasBits(emote.flags || 0, Flags.PRIVATE);

	export const IsZeroWidth = (emote: Emote) => HasBits(emote.flags || 0, Flags.ZERO_WIDTH);

	export const GetCurrentVersion = (emote: Emote): Version | null =>
		emote?.versions?.filter((ver) => emote && ver.id === emote.id)[0] ?? null;

	export const GetImage = (
		imageList: Common.Image[],
		format: Common.Image.Format,
		size: Size,
	): Common.Image | null => {
		if (!Array.isArray(imageList)) {
			return null;
		}
		return imageList.filter((img) => img.format === format)[parseInt(size.slice(0, 1)) - 1];
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
