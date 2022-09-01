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
		<Icon v-if="faIcon" :icon="faIcon" />
		<span>{{ label }}</span>
	</button>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import Icon from "./Icon.vue";

const props = defineProps({
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
