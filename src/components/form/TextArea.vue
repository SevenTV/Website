<template>
	<div class="text-area">
		<textarea ref="textarea" :value="modelValue" @input="onInput" :minlength="minLength" :maxlength="maxLength" />
		<label>
			<span> {{ label }} </span>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue-demi";

export default defineComponent({
	props: {
		label: String,
		minLength: Number,
		maxLength: Number,
		modelValue: String,
		autosize: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { emit }) {
		const textarea = ref<HTMLTextAreaElement | null>(null);
		const onInput = (event: Event) => {
			emit("update:modelValue", (event.target as HTMLInputElement).value);

			if (props.autosize && textarea.value) {
				textarea.value.style.height = Math.max(textarea.value?.scrollHeight, 64) + "px";
			}
		};

		return {
			textarea,
			onInput,
		};
	},
});
</script>

<style lang="scss">
@import "@scss/components/form/text-area.scss";
</style>
