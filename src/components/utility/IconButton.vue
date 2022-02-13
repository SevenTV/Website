<template>
	<Tooltip position="top" :text="disabled ? '' : tooltip">
		<button
			v-wave="{ duration: 0.2 }"
			:style="{ width: `${scale}rem`, height: `${scale}rem` }"
			class="button-base icon-button-type"
			:disabled="disabled"
			:color="color"
			@click="clicked"
		>
			<font-awesome-icon
				v-if="faIcon"
				:style="{ fontSize: `${scale / 1.75}rem` }"
				class="button-icon"
				:icon="['fas', faIcon]"
			/>
		</button>
	</Tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { useRouter } from "vue-router";
import Tooltip from "./Tooltip.vue";

export default defineComponent({
	components: {
		Tooltip,
	},
	props: {
		tooltip: {
			type: String,
			required: true,
		},
		appearance: {
			type: String as PropType<"flat" | "outline">,
			default: "flat",
		},
		// The theme color to use for the button
		color: {
			type: String,
			default: "primary",
			validator: (value: string): boolean => {
				return ["primary", "accent", "warning"].includes(value);
			},
		},
		scale: {
			type: Number,
			default: 2,
			required: false,
		},
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		useRoute: String,
		faIcon: String,
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
