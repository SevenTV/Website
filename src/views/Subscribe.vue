<template>
	<main class="subscribe">
		<div>Pls sub giv money</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
	setup() {
		useHead({
			title: "7TV | Subscribe",
		});
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/subscribe.scss";
</style>
