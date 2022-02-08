<template>
	<button
		v-wave
		class="button-base"
		:color="color"
		:disabled="disabled"
		:appearance="appearance"
		:class="{ 'no-bg': appearance !== 'raised' }"
		@click="clicked"
	>
		<font-awesome-icon v-if="faIcon" :icon="['fas', faIcon]" />
		<span>{{ label }}</span>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	props: {
		label: {
			type: String,
			required: true,
		},
		appearance: {
			type: String as PropType<"raised" | "flat" | "outline">,
			default: "raised",
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
	emits: ["interact"],

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
