import { LocalStorageKeys } from "@/store/lskeys";
import { defineStore } from "pinia";
import { useModal } from "@/store/modal";
import ModalError from "@/components/modal/ModalError.vue";

export const EgVault = {
	api: import.meta.env.VITE_APP_API_EGVAULT,
};

export interface SubscriptionResponse {
	active: boolean;
	age: number;
	subscription: Subscription;
	end_at: string | Date;
	renew: boolean;
}

export interface Subscription {
	customer_id: string;
	cycle: SubscriptionCycle;
	ended_at: string | Date;
	id: string;
	plan: string;
	product_id: string;
	provider: string;
	seats: number;
	started_at: string | Date;
	subscriber_id: string;
}

export interface SubscriptionCycle {
	internal: boolean;
	pending: boolean;
	status: string;
	timestamp: string | Date;
	unit: string;
	value: number;
}

export type ProductType = "subscription";

export interface Product {
	name: string;
	plans: ProductPlan[];
	current_paints: string[];
}

export interface ProductPlan {
	interval_unit: string;
	interval: number;
	price: number;
	discount?: number;
}

export type SubPlan = "monthly" | "yearly";

export interface StoreState {
	subscription: SubscriptionResponse | null;
	products: Product[];
}

export const useEgVault = defineStore("egvault", {
	state: () =>
		({
			subscription: null,
			products: [],
		} as StoreState),
	getters: {
		subscribed: (state) => state.subscription?.active ?? false,
		subEndDate: (state) => (state.subscription?.end_at ? new Date(state.subscription.end_at) : new Date(0)),
		subProduct: (state) => state.products.find((p) => p.name === "subscription"),
	},
	actions: {
		async fetchSub(): Promise<SubscriptionResponse> {
			const resp = await fetch(`${EgVault.api}/v1/subscriptions/@me`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
				},
			});
			const sub: SubscriptionResponse = await resp.json();

			this.subscription = sub;
			return sub;
		},
		async fetchProducts(): Promise<Product[]> {
			const response = await fetch(EgVault.api + "/v1/products");
			const products = await response.json();

			this.products = products;
			return products;
		},

		async cancelSub(): Promise<Response> {
			const resp = await fetch(`${EgVault.api}/v1/subscriptions/@me`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
				},
			});
			if (!resp.ok) {
				this.showError(resp);
				return resp;
			}

			return resp;
		},

		async reactivateSub(): Promise<Response> {
			const resp = await fetch(`${EgVault.api}/v1/subscriptions/@me/reactivate`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
				},
			});
			if (!resp.ok) {
				this.showError(resp);
				return resp;
			}

			return resp;
		},

		async updatePayment(): Promise<Response> {
			const resp = await fetch(`${EgVault.api}/v1/subscriptions/@me/payment-method?next=true`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
				},
			});
			if (!resp.ok) {
				this.showError(resp);
				return resp;
			}

			return resp;
		},

		async showError(resp: Response) {
			const body = await resp.json();
			if (!body) {
				return;
			}

			const modal = useModal();

			const msg = body.error.split(":")[0].replace(String(body.error_code), "");
			const detail = body.error.split(":")[1];

			modal.open("ErrorModal", {
				component: ModalError,
				events: {},
				props: {
					error: msg,
					detail: detail,
					code: body.error_code,
				},
			});
		},
	},
});
