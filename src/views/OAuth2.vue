<template>
	<main clas="oauth2callback">
		<span v-if="!prompt">This window should close...</span>
		<div v-else class="manual-prompt">
			<h3>You are not currently signed in to an account</h3>
			<p>To link your {{ platform }} account to an existing 7TV user, sign in first.</p>

			<div class="manual-buttons">
				<LoginButton v-if="!actor.user" />
				<Button
					v-tooltip="'A new account will be created for you'"
					label="Continue"
					color="primary"
					appearance="outline"
					@click="prompt = false"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { useActor } from "@/store/actor";
import { LocalStorageKeys } from "@store/lskeys";
import Button from "@/components/utility/Button.vue";
import LoginButton from "@/components/utility/LoginButton.vue";

useHead({
	title: "7TV | Authentication (OAuth2 Calllback)",
});

const route = useRoute();
const token = route.query.token;
const platform = route.query.platform;
const userID = route.query.user_id;

const actor = useActor();

if (typeof token === "string") {
	localStorage.setItem(LocalStorageKeys.TOKEN, token);
}

const prompt = ref(false);
const manual = route.query.manual;

async function verify(tokenValue?: string) {
	if (!platform || !userID) {
		throw new Error("missing platform or user_id");
	}

	// Request the API to verify the code in bio
	const query = new URLSearchParams([
		["platform", platform.toString()],
		["id", userID.toString()],
		["verify", "1"],
	]);

	const resp = await fetch(import.meta.env.VITE_APP_API_REST + `/auth/manual?${query.toString()}`, {
		headers: {
			Authorization: tokenValue ? `Bearer ${tokenValue}` : "",
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
}

if (manual && userID && platform) {
	const noPrompt = route.query.skip_prompt;

	if (!actor.user && !noPrompt) {
		prompt.value = true;

		watch([actor, prompt], ([actor, p]) => {
			if (p && !actor) return;

			const token = localStorage.getItem(LocalStorageKeys.TOKEN);
			verify(token || undefined);
			prompt.value = false;
		});
	} else {
		const currentToken = localStorage.getItem(LocalStorageKeys.TOKEN);

		await verify(currentToken || undefined);
	}
} else {
	window.close();
}

watch;
</script>

<style scoped lang="scss">
.manual-prompt {
	height: 100%;
	display: grid;
	align-content: center;
	place-items: center;
	text-align: center;
	row-gap: 1rem;
	font-size: 120%;
	padding: 1rem;

	.manual-buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 0.5rem;
	}

	button {
		height: 2.5rem;
	}
}
</style>
