import { RouteRecordRaw } from "vue-router";

export const StoreRoute = {
	path: "/store",
	alias: "/subscribe",
	name: "Store",
	meta: { transparentNav: true },
	component: () => import("@views/Store/Store.vue"),
	children: [
		{
			path: "purchase",
			name: "StorePurchase",
			props: true,
			meta: { transparentNav: true },
			beforeEnter: (to, _, next) => {
				switch (to.params.productType) {
					case "subscription":
						next();
						break;

					default:
						next({ name: "Store" });
				}
			},
			component: () => import("@/views/Store/StorePurchase.vue"),
		},
	],
} as RouteRecordRaw;
