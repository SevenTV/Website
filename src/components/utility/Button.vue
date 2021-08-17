<template>
	<router-link class="button-base" v-bind:color="color" :to="{ useRoute }">
		<font-awesome-icon v-if="faIcon" :icon="['fas', faIcon]" />
		<span>{{ label }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	props: {
		label: String,
		// The theme color to use for the button
		color: {
			validator(value: string): boolean {
				return ["primary", "accent", "warning"].includes(value);
			},
		},
		useRoute: String,
		faIcon: String,
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/button.scss";
</style>
