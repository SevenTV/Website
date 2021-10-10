<template>
	<div class="emote-paginator"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		page: {
			type: Number,
			required: true,
			default: 500,
		},
		total: {
			type: Number,
			required: true,
		},
	},

	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
</style>
