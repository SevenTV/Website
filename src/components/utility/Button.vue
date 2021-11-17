<template>
	<button class="button-base" v-bind:color="color" @click="clicked" :disabled="disabled">
		<font-awesome-icon v-if="faIcon" :icon="['fas', faIcon]" />
		<span>{{ label }}</span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default defineComponent({
	props: {
		label: {
			type: String,
			required: true,
		},
		// The theme color to use for the button
		color: {
			type: String,
			validator: (value: string): boolean => {
				return ["primary", "accent", "warning"].includes(value);
			},
		},
		useRoute: String,
		faIcon: String,
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	// eslint-disable-next-line prettier/prettier
	setup(props, { emit }) {
		const router = useRouter();
		const clicked = () => {
			if (props.disabled) {
				return;
			}
			if (props.useRoute) {
				router.push(props.useRoute);
			}

			emit("interact");
		};

		return {
			clicked,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/button.scss";
</style>
