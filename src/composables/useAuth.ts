import { LocalStorageKeys } from "@/store/lskeys";
import { User } from "@/structures/User";
import { log } from "@/Logger";

export function useAuth() {
	function prompt(provider: User.Connection.Platform, token?: string | null): Promise<string> {
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
				resolve(localStorage.getItem(LocalStorageKeys.TOKEN) || "");
			}, 100);
		});
	}

	function logout() {
		const bearer = localStorage.getItem(LocalStorageKeys.TOKEN);
		fetch(import.meta.env.VITE_APP_API_REST + "/auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				Authorization: bearer ? "Bearer " + bearer : "",
			},
		})
			.then(() => {
				log.info("Signed out");
				localStorage.removeItem(LocalStorageKeys.TOKEN);
			})
			.catch((err) => log.error("failed to sign out", err.message));
	}

	return {
		prompt,
		logout,
	};
}
