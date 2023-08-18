import { Component } from "vue";
import BgBadge1VueSvg from "@/components/base/BgBadge1.vue";
import BgBadge2VueSvg from "@/components/base/BgBadge2.vue";
import BgBadge3VueSvg from "@/components/base/BgBadge3.vue";
import BgBadge4VueSvg from "@/components/base/BgBadge4.vue";
import BgBadgeTranslatorVueSvg from "@/components/base/BgBadgeTranslator.vue";
import BgBadgeXmasGifterVueSvg from "@/components/base/BgBadgeXmasGifter.vue";

export const badgeDefs = [
	{
		id: "sub1",
		name: "1 Month",
		sub: true,
		days: 0,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#fee029", offset: 0 },
					{ color: "#ff7f21", offset: 1 },
				],
			},
		},
	},
	{
		id: "sub2",
		name: "2 Months",
		sub: true,
		days: 30,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ffb400", offset: 0 },
					{ color: "#f0106d", offset: 1 },
				],
			},
		},
	},
	{
		id: "sub3",
		name: "3 Months",
		sub: true,
		days: 60,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ff256b", offset: 0 },
					{ color: "#a60a4b", offset: 1 },
				],
			},
		},
	},
	{
		id: "sub6",
		name: "6 Months",
		sub: true,
		days: 152,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ff447c", offset: 0 },
					{ color: "#9704fd", offset: 1 },
				],
			},
		},
	},
	{
		id: "sub9",
		name: "9 Months",
		sub: true,
		days: 243,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#02e5f8", offset: 0 },
					{ color: "#664eee", offset: 1 },
				],
			},
		},
	},
	{
		id: "sub12",
		name: "1 Year",
		sub: true,
		days: 334,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			component: BgBadge1VueSvg,
		},
	},
	{
		id: "sub15",
		name: "1.25 Years",
		sub: true,
		days: 425,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			component: BgBadge2VueSvg,
		},
	},
	{
		id: "sub18",
		name: "1.5 Years",
		sub: true,
		days: 516,
		logo: { color: "#ffffff" },
		border: { color: "transparent" },
		background: {
			component: BgBadge3VueSvg,
		},
	},
	{
		id: "sub21",
		name: "1.75 Years",
		sub: true,
		logo: { color: "#ffffff" },
		border: { color: "transparent" },
		background: {
			component: BgBadge4VueSvg,
		},
	},
	{
		id: "sub24",
		name: "2 Years",
		sub: true,
		img: "https://cdn.7tv.app/badge/64dfeec02040c6754787d929/3x",
	},
	{
		id: "sub27",
		name: "2.25 Years",
		sub: true,
		img: "https://cdn.7tv.app/badge/64dff4652040c6754787d92a/3x",
	},
	{
		id: "sub30",
		name: "2.5 Years",
		sub: true,
		img: "https://cdn.7tv.app/badge/64dff95e2040c6754787d92f/3x",
	},
	{
		id: "sub33",
		name: "2.75 Years",
		sub: true,
		img: "https://cdn.7tv.app/badge/64dff9c32040c6754787d930/3x",
	},
	{
		id: "subfounder",
		name: "Founder",
		sub: true,
		background: { color: "#18181b" },
		logo: { color: "#ffffff" },
		border: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#fee029", offset: 0 },
					{ color: "#ff7f21", offset: 1 },
				],
			},
		},
	},
	{
		id: "xmasgift",
		name: "XMAS Gifter",
		sub: false,
		logo: {
			color: "#18181b",
		},
		background: {
			component: BgBadgeXmasGifterVueSvg,
		},
	},
	{
		id: "contributor",
		background: { color: "#18181b" },
		logo: { color: "#ffffff" },
		border: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#11F9ED", offset: 0 },
					{ color: "#48EE66", offset: 1 },
				],
			},
		},
	},
	{
		id: "translator",
		name: "Translator",
		logo: { color: "#ffffff" },
		background: {
			component: BgBadgeTranslatorVueSvg,
		},
	},
	{
		id: "mod",
		name: "Moderator",
		background: { color: "#18181b" },
		logo: {
			gradient: {
				angle: 22.5,
				stops: [
					{ color: "#3dc917", offset: 0 },
					{ color: "#01839c", offset: 1 },
				],
			},
		},
	},
	{
		id: "events",
		name: "Event Coordinator",
		background: { color: "#18181b" },
		logo: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ffbf00", offset: 0 },
					{ color: "#9b06f8", offset: 1 },
				],
			},
		},
	},
	{
		id: "admin",
		name: "Admin",
		background: { color: "#18181b" },
		logo: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#db248d", offset: 0 },
					{ color: "#ff1a00", offset: 1 },
				],
			},
		},
	},
	{
		id: "kathy",
		background: { color: "#18181b" },
		logo: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ff72e8", offset: 0 },
					{ color: "#ff0b64", offset: 1 },
				],
			},
		},
	},
] as BadgeDef[];

export const getBadgeByID = (id: string, refID?: string) => {
	const x = badgeDefs.find((b) => b.id === id || (refID && b.refID === refID));
	if (refID && x) {
		x.refID = refID;
	}

	return x;
};

export const getNearestBadgeByAge = (age: number): BadgeDef | null => {
	return badgeDefs
		.filter((b) => b.sub)
		.reduce((prev, curr) => (Math.abs(age - (curr?.days ?? 0)) < Math.abs(age - (prev?.days ?? 0)) ? curr : prev));
};

export const getNextBadge = (id: string, sub?: boolean): BadgeDef | null => {
	let result: BadgeDef | null = null;

	badgeDefs.find((b, index) => {
		if (sub && !b.sub) {
			return;
		}

		if (b.id === id) {
			result = badgeDefs[index + 1];
		}
	});

	return result;
};

export interface BadgeDef {
	id: string;
	refID?: string;
	name: string;
	sub?: boolean;
	days?: number;
	img?: string;
	background: {
		color?: string;
		component?: Component;
		gradient?: GradientDef;
	};
	logo: {
		color: string;
		gradient?: GradientDef;
	};
	border: {
		color?: string;
		gradient?: GradientDef;
	};
}

export interface GradientDef {
	angle: number;
	stops: {
		offset: number;
		color: string;
		opacity?: number;
	}[];
}
