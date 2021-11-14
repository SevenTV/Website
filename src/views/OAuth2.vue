<template>
	<main clas="oauth2callback">
		<span>This window should close...</span>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue-demi";
import { useRoute } from "vue-router";

export default defineComponent({
	setup() {
		useHead({
			title: "7TV | Authentication (OAuth2 Calllback)",
		});

		const route = useRoute();
		const token = route.query.token;
		if (typeof token === "string") {
			localStorage.setItem("token", token);
		}

		window.close();
		return {};
	},
});
</script>
