import { watchEffect } from "vue";
import { useActor } from "@/store/actor";
import { useStore } from "@/store/main";
import { User } from "@/structures/User";

declare global {
	function gtag(...args: unknown[]): void;
}

export function setupAnalytics() {
	const actor = useActor();
	const store = useStore();
	watchEffect(() => {
		const user = actor.user;
		if (!user?.roles || !Object.keys(store.roles).length) return;

		gtag("set", "user_properties", { staff: User.IsPrivileged(user) ? "yes" : "no" });
	});
}
