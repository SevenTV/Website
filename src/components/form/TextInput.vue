<template>
	<div class="text-input">
		<input :value="modelValue" :empty="modelValue?.length == 0" @input="onInput" />
		<label>
			<span> {{ label }} </span>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		label: String,
		modelValue: String,
	},
	emits: ["update:modelValue"],
	setup(props, { emit }) {
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
