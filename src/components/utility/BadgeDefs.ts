import type { Component } from "vue";
import BgBadge1VueSvg from "@/components/base/BgBadge1.vue";
import BgBadge2VueSvg from "@/components/base/BgBadge2.vue";
import BgBadge3VueSvg from "@/components/base/BgBadge3.vue";
import BgBadge4VueSvg from "@/components/base/BgBadge4.vue";

export const badgeDefs = [
	{
		id: "sub1",
		name: "1 month",
		sub: true,
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
		name: "2 months",
		sub: true,
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
		name: "3 months",
		sub: true,
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
		name: "6 months",
		sub: true,
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
		name: "9 months",
		sub: true,
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
		name: "12 months",
		sub: true,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			component: BgBadge1VueSvg,
		},
	},
	{
		id: "sub15",
		name: "15 months",
		sub: true,
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			component: BgBadge2VueSvg,
		},
	},
	{
		id: "sub18",
		name: "18 months",
		sub: true,
		logo: { color: "#ffffff" },
		border: { color: "transparent" },
		background: {
			component: BgBadge3VueSvg,
		},
	},
	{
		id: "sub21",
		name: "21 months",
		sub: true,
		logo: { color: "#ffffff" },
		border: { color: "transparent" },
		background: {
			component: BgBadge4VueSvg,
		},
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
		id: "mod",
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
		id: "admin",
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

export const getBadgeByID = (id: string) => {
	return badgeDefs.find((b) => b.id === id);
};

export interface BadgeDef {
	id: string;
	name: string;
	sub?: boolean;
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
