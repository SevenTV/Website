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
			title: `${process.env.VUE_APP_TITLE} | Home`,
		});
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
