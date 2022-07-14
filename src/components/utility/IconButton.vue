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
				:icon="['far', faIcon]"
			/>
		</button>
	</Tooltip>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import Tooltip from "@components/utility/Tooltip.vue";

const props = defineProps({
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
});

const emit = defineEmits(["interact"]);

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
</script>

<style lang="scss" scoped>
@import "@scss/components/button.scss";
</style>
