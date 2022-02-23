<template>
	<div class="text-input">
		<input :value="modelValue" :empty="!modelValue?.length" @input="onInput" @blur="$emit('blur')" />
		<label>
			<slot name="icon" />
			<span> {{ label }} </span>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
	props: {
		label: String,
		modelValue: String,
		icon: {
			type: Object as PropType<[string, string]>,
		},
		appearance: {
			type: String as PropType<"flat" | "outline">,
			default: "flat",
		},
	},
	emits: ["update:modelValue", "blur"],
	setup(_, { emit }) {
		const onInput = (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value);

		return {
			onInput,
		};
	},
});
</script>

<style lang="scss">
@import "@scss/components/form/text-input.scss";
</style>
