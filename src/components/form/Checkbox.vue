<template>
	<label ref="checkbox" class="checkbox">
		<input type="checkbox" :checked="checked" @input="onInput" />
		<span class="checkmark">
			<font-awesome-icon class="check-icon" :icon="['fas', 'check']" />
		</span>
		{{ label }}
	</label>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue-demi";

export default defineComponent({
	props: {
		label: String,
		checked: Boolean,
		scale: {
			type: String,
			default: "1.25em",
		},
	},
	setup(props, { emit }) {
		const checkbox = ref<HTMLInputElement | null>(null);
		const onInput = (event: Event) => emit("update:checked", (event.target as HTMLInputElement).checked);

		onMounted(() => {
			checkbox.value?.style.setProperty("--formcontrol-checkbox-scale", props.scale);
		});

		return {
			onInput,
			checkbox,
		};
	},
});
</script>

<style lang="scss">
@import "@scss/components/form/checkbox.scss";
</style>
