<template>
	<Tooltip position="top" :text="disabled ? '' : tooltip">
		<button
			:style="{ width: `${scale}em`, height: `${scale}em` }"
			class="button-base icon-button-type"
			:disabled="disabled"
			v-bind:color="color"
			v-on:click="clicked"
		>
			<font-awesome-icon
				:style="{ fontSize: `${scale / 1.75}em` }"
				class="button-icon"
				v-if="faIcon"
				:icon="['fas', faIcon]"
			/>
		</button>
	</Tooltip>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
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
