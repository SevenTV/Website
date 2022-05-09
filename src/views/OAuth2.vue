<template>
	<main clas="oauth2callback">
		<span>This window should close...</span>
	</main>
</template>

<script setup lang="ts">
import { LocalStorageKeys } from "@store/lskeys";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

useHead({
	title: "7TV | Authentication (OAuth2 Calllback)",
});

const route = useRoute();
const token = route.query.token;
if (typeof token === "string") {
	localStorage.setItem(LocalStorageKeys.TOKEN, token);
}

window.close();
</script>
