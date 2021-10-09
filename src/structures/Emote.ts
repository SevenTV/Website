import { store } from "@/store";
import { User } from "@/structures/User";
import { BitField } from "@/structures/util/BitField";

export class Emote {
	owner: User | null = null;

	get id(): string {
		return this.data.id;
	}

	constructor(public data: Emote.Type) {
		if (data.owner) {
			store.commit("SET_USER", { id: data.owner.id, data: data.owner });
			this.owner = store.getters.user(data.owner.id);
		}
	}

	update(data: Partial<Emote.Type>): void {
		this.data = {
			...this.data,
			...data,
		};
		if (data.owner) {
			store.commit("SET_USER", { id: data.owner.id ?? this.owner?.id, data: data.owner });
		}
	}

	getName(): string {
		return this.data.name;
	}

	/**
	 * @returns whether or not the emote is global
	 */
	isGlobal(): boolean {
		return BitField.HasBits(this.data.visibility ?? 0, Emote.Visibility.GLOBAL);
	}
	/**
	 * @returns whether or not the emote is private
	 */
	isPrivate(): boolean {
		return BitField.HasBits(this.data.visibility ?? 0, Emote.Visibility.PRIVATE);
	}
	/**
	 * @returns whether or not the emote is unlisted
	 */
	isUnlisted(): boolean {
		return BitField.HasBits(this.data.visibility ?? 0, Emote.Visibility.HIDDEN);
	}
	/**
	 * @returns whether or not the emote is zero width
	 */
	isZeroWidth(): boolean {
		return BitField.HasBits(this.data.visibility ?? 0, Emote.Visibility.ZERO_WIDTH);
	}

	getURL(size: "1" | "2" | "3" | "4"): string | null {
		const url = this.data.urls?.filter((url) => url[0] === size)[0];

		if (Array.isArray(url) && typeof url[1] === "string") {
			return url[1];
		} else {
			return null;
		}
	}

	static Create(data: Emote.Type): Emote {
		return new Emote(data);
	}
}

export namespace Emote {
	export interface Type {
		id: string;
		name: string;
		owner?: User.Type;
		owner_id?: string;
		visibility: number;
		channel_count?: number;
		channels?: Partial<User.Type>[];
		mime?: string;
		status: Status;
		tags: string[];
		created_at?: string | Date;
		provider?: Emote.Provider;
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

	export type Provider = "7TV" | "TWITCH" | "BTTV" | "FFZ" | "EMOJI";
}
