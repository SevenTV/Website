<template>
	<label ref="checkbox" class="checkbox">
		<input type="checkbox" :checked="checked" @change="onInput" />
		<span class="checkmark">
			<font-awesome-icon class="check-icon" :icon="['fas', 'check']" />
		</span>
		{{ label }}
	</label>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
	label: String,
	checked: Boolean,
	scale: {
		type: String,
		default: "1.25em",
	},
});

const checkbox = ref<HTMLInputElement | null>(null);

const emit = defineEmits(["update:checked"]);
const onInput = (event: Event) => emit("update:checked", (event.target as HTMLInputElement).checked);

onMounted(() => {
	checkbox.value?.style.setProperty("--formcontrol-checkbox-scale", props.scale);
});
</script>

<style lang="scss">
@import "@scss/components/form/checkbox.scss";
</style>
