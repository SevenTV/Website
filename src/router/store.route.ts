import { Product } from "@/views/Store/egvault";
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
				let prod: Product;
				try {
					prod = JSON.parse(to.params.productData as string);
				} catch (e) {
					next({ name: "Store" });
					return;
				}

				switch (prod.name) {
					case "subscription":
						next();
						break;

					default:
						next({ name: "Store" });
				}
			},
			component: () => import("@/views/Store/StorePurchase.vue"),
		},
		{
			path: "redeem",
			name: "StoreRedeem",
			meta: { transparentNav: true },
			component: () => import("@/views/Store/StoreRedeem.vue"),
		},
		{
			path: "complete",
			beforeEnter: (to, _, next) => {
				if (!window.opener) {
					next({ name: "Store" }); // no parent window, act like normal site
				}

				const id = window.name.split(":")[1];
				if (!id) {
					next({ name: "Store" }); // no window id
				}

				// Send data to the parent window
				window.opener.postMessage(
					JSON.stringify({
						status: "COMPLETE",
						id,
					}),
					"*",
				);

				// Callback complete, close the window
				window.close();
			},
		},
		{
			path: "cancel",
			beforeEnter: (to, _, next) => {
				if (!window.opener) {
					next({ name: "Store" }); // no parent window, act like normal site
				}

				const id = window.name.split(":")[1];
				if (!id) {
					next({ name: "Store" }); // no window id
				}

				// Send data to the parent window
				window.opener.postMessage(
					JSON.stringify({
						status: "CANCEL",
						id,
					}),
					"*",
				);

				// Callback complete, close the window
				window.close();
			},
		},
	],
} as RouteRecordRaw;
