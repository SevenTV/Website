<template>
	<div class="text-area">
		<textarea ref="textarea" :value="modelValue" :minlength="minLength" :maxlength="maxLength" @input="onInput" />
		<label>
			<span> {{ label }} </span>
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
	label: String,
	minLength: Number,
	maxLength: Number,
	modelValue: String,
	autosize: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const textarea = ref<HTMLTextAreaElement | null>(null);
const onInput = (event: Event) => {
	emit("update:modelValue", (event.target as HTMLInputElement).value);

	if (props.autosize && textarea.value) {
		textarea.value.style.height = Math.max(textarea.value?.scrollHeight, 64) + "px";
	}
};
</script>

<style lang="scss">
@import "@scss/components/form/text-area.scss";
</style>
