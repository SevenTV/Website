<template>
	<div class="color-input">
		<input type="color" :value="value ?? modelValue" class="color-input" @input="onInput" />
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		modelValue?: string;
		width?: string;
		height?: string;
		value?: string;
	}>(),
	{
		width: "3em",
		height: "3em",
	},
);

const emit = defineEmits(["update:modelValue", "blur", "input"]);

const onInput = (ev: Event) => {
	emit("update:modelValue", (ev.target as HTMLInputElement).value);
	emit("input", (ev.target as HTMLInputElement).value);
};
</script>

<style lang="scss">
input.color-input {
	all: unset;
	appearance: auto;
	width: v-bind(width);
	height: v-bind(height);
}
</style>
