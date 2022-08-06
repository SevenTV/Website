export const EgVault = {
	api: import.meta.env.VITE_APP_API_EGVAULT,
};

export interface SubscriptionResponse {
	active: boolean;
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
