<template>
	<main clas="oauth2callback">
		<span>This window should close...</span>
	</main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { LocalStorageKeys } from "@store/lskeys";

useHead({
	title: "7TV | Authentication (OAuth2 Calllback)",
});

const route = useRoute();
const token = route.query.token;
if (typeof token === "string") {
	localStorage.setItem(LocalStorageKeys.TOKEN, token);
}

const manual = route.query.manual;

if (manual) {
	const platform = route.query.platform;
	const userID = route.query.user_id;
	if (!platform || !userID) {
		throw new Error("missing platform or user_id");
	}

	// Request the API to verify the code in bio
	const query = new URLSearchParams([
		["platform", platform.toString()],
		["id", userID.toString()],
		["verify", "1"],
	]);

	const currentToken = localStorage.getItem(LocalStorageKeys.TOKEN);
	const resp = await fetch(import.meta.env.VITE_APP_API_REST + `/auth/manual?${query.toString()}`, {
		headers: {
			Authorization: currentToken ? `Bearer ${currentToken}` : "",
		},
	});
	if (!resp || !resp.ok) {
		throw new Error("failed to verify code");
	}

	const cb = route.query.callback ? decodeURIComponent(route.query.callback.toString()) : "";
	const tok = resp.headers.get("X-Access-Token");
	if (cb && tok) {
		localStorage.setItem(LocalStorageKeys.TOKEN, tok);
		window.location.href = cb + "?seventv_token=" + tok;
	}
} else {
	window.close();
}
</script>
