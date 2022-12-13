import { RouteRecordRaw } from "vue-router";

export const LegalRoute = [
	{
		path: "/legal/privacy",
		name: "LegalPrivacy",
		meta: { transition: "zoom" },
		component: () => import("@/views/legal/LegalPrivacy.vue"),
	},
	{
		path: "/legal/terms",
		name: "LegalTerms",
		props: true,
		component: () => import("@/views/legal/LegalTerms.vue"),
	},
] as RouteRecordRaw[];
