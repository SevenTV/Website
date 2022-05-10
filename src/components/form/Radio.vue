<template>
	<label ref="radio" class="radio">
		<input type="radio" :checked="itemID == modelValue" :value="itemID" @change="onInput" />
		<div class="circle"></div>
		<span>{{ label }}</span>
	</label>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
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
});

const emit = defineEmits(["update:modelValue"]);

const radio = ref<HTMLInputElement | null>(null);
const onInput = (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value);

onMounted(() => {
	radio.value?.style.setProperty("--formcontrol-radio-scale", props.scale);
});
</script>

<style lang="scss">
@import "@scss/components/form/radio.scss";
</style>
