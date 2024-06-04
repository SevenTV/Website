<template>
	<div class="extension-auth-content">
		<LoginButton v-if="!actor.user" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useActor } from "@/store/actor";
import { useStore } from "@/store/main";
import LoginButton from "@/components/utility/LoginButton.vue";

const store = useStore();
const actor = useActor();
watch(
	() => store.authToken,
	(t) => {
		if (!t) return;
		if (parent === window) location.href = "/";
		parent.postMessage({ type: "7tv-token", token: t }, "https://www.twitch.tv/*");
	},
	{ immediate: true },
);
onMounted(() => {
	if (parent === window) location.href = "/";
});
</script>

<style lang="scss">
nav {
	display: none;
}
.extension-auth-content {
	display: flex;
	margin: auto;
	justify-content: center;
}
</style>
