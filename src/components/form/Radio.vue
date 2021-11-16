<template>
	<label ref="radio" class="radio">
		<input type="radio" :checked="itemID == modelValue" :value="itemID" @change="onInput" />
		<div class="circle"></div>
		<span>{{ label }}</span>
	</label>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue-demi";

export default defineComponent({
	props: {
		label: String,
		itemID: {
			type: String,
			required: true,
		},
		modelValue: String,
		scale: {
			type: String,
			default: "1.25em",
		},
	},
	setup(props, { emit }) {
		const radio = ref<HTMLInputElement | null>(null);
		const onInput = (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value);

		onMounted(() => {
			radio.value?.style.setProperty("--formcontrol-radio-scale", props.scale);
		});

		return {
			onInput,
			radio,
		};
	},
});
</script>

<style lang="scss">
@import "@scss/components/form/radio.scss";
</style>
