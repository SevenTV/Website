<template>
	<div class="text-input">
		<input :value="modelValue" :empty="!modelValue?.length" @input="onInput" @blur="$emit('blur')" />
		<label>
			<span> {{ label }} </span>
		</label>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
	label: String,
	modelValue: String,
	icon: {
		type: Object as PropType<[string, string]>,
	},
	appearance: {
		type: String as PropType<"flat" | "outline">,
		default: "flat",
	},
});

const emit = defineEmits(["update:modelValue", "blur"]);
const onInput = (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value);
</script>

<style lang="scss">
@import "@scss/components/form/text-input.scss";
</style>
