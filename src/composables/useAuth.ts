import { User } from "@/structures/User";
import { log } from "@/Logger";

export function useAuth() {
	function prompt(provider: User.Connection.Platform, token?: string | null): Promise<void> {
		const w = window.open(
			`${import.meta.env.VITE_APP_API_REST}/auth?platform=${provider.toLowerCase()}` +
				(token ? `&token=${token}` : ""),
			"seventv-oauth2",
			"_blank, width=850, height=650, menubar=no, location=no",
		);

		return new Promise((resolve) => {
			const i = setInterval(async () => {
				if (!w?.closed) {
					return;
				}

				clearInterval(i);
				resolve();
			}, 100);
		});
	}

	function logout() {
		fetch(import.meta.env.VITE_APP_API_REST + "/auth/logout", {
			method: "POST",
			credentials: "include",
		})
			.then(() => {
				log.info("Signed out");
			})
			.catch((err) => log.error("failed to sign out", err.message));
	}

	return {
		prompt,
		logout,
	};
}
