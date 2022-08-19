import { RouteRecordRaw } from "vue-router";

export const LegalRoute = [
	{
		path: "/legal/privacy",
		name: "LegalPrivacy",
		meta: { transition: "zoom" },
		component: () => import("@views/Legal/LegalPrivacy.vue"),
	},
	{
		path: "/legal/terms",
		name: "LegalTerms",
		props: true,
		component: () => import("@views/Legal/LegalTerms.vue"),
	},
] as RouteRecordRaw[];
