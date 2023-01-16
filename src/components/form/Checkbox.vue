<template>
	<label ref="checkbox" class="checkbox" :class="{ disabled }">
		<input type="checkbox" :checked="checked" @change="onInput" />
		<span class="checkmark">
			<Icon class="check-icon" icon="check" />
		</span>
		{{ label }}
	</label>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Icon from "../utility/Icon.vue";

const props = defineProps({
	label: String,
	checked: Boolean,
	disabled: Boolean,
	scale: {
		type: String,
		default: "1.25em",
	},
});

const checkbox = ref<HTMLInputElement | null>(null);

const emit = defineEmits(["update:checked", "update:modelValue"]);
const onInput = (event: Event) =>
	["update:checked", "update:modelValue"].forEach((e) =>
		emit(e as keyof typeof emit, (event.target as HTMLInputElement).checked),
	);

onMounted(() => {
	checkbox.value?.style.setProperty("--formcontrol-checkbox-scale", props.scale);
});
</script>

<style lang="scss">
@import "@scss/components/form/checkbox.scss";
</style>
