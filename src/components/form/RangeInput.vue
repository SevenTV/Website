<template>
	<div class="range-input">
		<input
			type="range"
			:min="min"
			:max="max"
			:step="step"
			:value="value ?? modelValue"
			class="range-slider"
			@input="onInput"
		/>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		modelValue?: number;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
	}>(),
	{
		min: 0,
		max: 100,
		step: 1,
	},
);

const emit = defineEmits(["update:modelValue", "blur", "input"]);

const onInput = (ev: Event) => {
	emit("update:modelValue", (ev.target as HTMLInputElement).value);
	emit("input", (ev.target as HTMLInputElement).value);
};
</script>

<style lang="scss">
@import "@scss/themes.scss";

> div.range-input > input.range-input {
	display: block;
}
</style>
