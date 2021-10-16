import type { Emote } from "@/structures/Emote";
import type { Role } from "@/structures/Role";
import type { Notification } from "@/structures/Notification";

export interface User {
	role: Role;
	emotes: Emote[];
	emote_ids: string[];
	emote_aliases: string[][];
	owned_emotes: Emote[];
	broadcaster_type: string;
	description: string;
	display_name: string;
	editor_ids: string;
	editor_in: User[];
	editors: User[];
	id: string;
	login: string;
	offline_image_url: string;
	profile_image_url: string;
	type: string;
	view_count: number;
	email: string;
	created_at: string | Date;
	token_version?: string;
	banned?: boolean;
	emote_slots: number;
	follower_count: number;
	notification_count: number;
	notifications: Notification[];
}

export const ConvertIntToHSVColor = (color: number) => {
	const r = color >> 16;
	const g = (color >> 8) & ((1 << 8) - 1);
	const b = color & ((1 << 8) - 1);
	return ConvertRGBToHSVColor(r, g, b);
};

export const ConvertRGBToHSVColor = (r: number, g: number, b: number) => {
	const rabs = r / 255;
	const gabs = g / 255;
	const babs = b / 255;
	const v = Math.max(rabs, gabs, babs);
	const diff = v - Math.min(rabs, gabs, babs);
	const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
	const percentRoundFn = (num: number) => Math.round(num * 100) / 100;
	let h = 0;
	let s = 0;
	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		const rr = diffc(rabs);
		const gg = diffc(gabs);
		const bb = diffc(babs);

		if (rabs === v) {
			h = bb - gg;
		} else if (gabs === v) {
			h = 1 / 3 + rr - bb;
		} else if (babs === v) {
			h = 2 / 3 + gg - rr;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}
	return {
		h: Math.round(h * 360),
		s: percentRoundFn(s * 100),
		v: percentRoundFn(v * 100),
	};
};

export const hsv2hsl = (h: number, s: number, v: number, l = v - (v * s) / 2, m = Math.min(l, 1 - l)) => [
	h,
	m ? (v - l) / m : 0,
	l,
];

export const hsl2hsv = (h: number, s: number, l: number, v = s * Math.min(l, 1 - l) + l) => [
	h,
	v ? 2 - (2 * l) / v : 0,
	v,
];

export const NormalizeColor = (color: number, loweLight: number, upperLight: number) => {
	const r = color >> 16;
	const g = (color >> 8) & ((1 << 8) - 1);
	const b = color & ((1 << 8) - 1);
	const hsv = ConvertRGBToHSVColor(r, g, b);
	const hsl = hsv2hsl(hsv.h / 360, hsv.s / 100, hsv.v / 100).map((v) => v * 100);
	return `hsl(${hsl[0] * 3.6}deg, ${hsl[1]}%, ${
		hsl[2] < loweLight ? loweLight : hsl[2] > upperLight ? upperLight : hsl[2]
	}%)`;
};
