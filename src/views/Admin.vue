<template>
	<div class="home">Hello World</div>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Home",
	setup() {
		useHead({
			title: "Home - 7TV",
		});
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/home.scss";
</style>
