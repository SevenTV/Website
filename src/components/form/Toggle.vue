<template>
	<div class="seventv-toggle-outer">
		<span v-if="left" class="seventv-toggle-option">
			{{ left }}
		</span>
		<label class="seventv-toggle-switch" :for="id">
			<input :id="id" v-model="value" tabindex="0" type="checkbox" @change="$emit('update:modelValue', value)" />
			<div class="seventv-toggle round"></div>
		</label>
		<span v-if="right" class="seventv-toggle-option">
			{{ right }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	id: string;
	left?: string;
	right?: string;
	modelValue: boolean;
}>();

const value = ref(props.modelValue);

defineEmits<{
	(e: "update:modelValue", value: boolean): void;
}>();
</script>

<style scoped lang="scss">
.seventv-toggle-outer {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 0.8rem;
}

.seventv-toggle-option {
	font-size: 1rem;
	font-weight: 600;
	vertical-align: center;
}

.seventv-toggle-switch {
	display: inline-block;
	height: 1rem;
	position: relative;
	width: 2rem;
}

.seventv-toggle {
	inset: 0;
	cursor: pointer;
	position: absolute;
	transition: 0.25s;
	outline: 0.01rem solid currentcolor;
}

.seventv-toggle::before {
	bottom: 0.15rem;
	content: "";
	height: 0.7rem;
	left: 0.15rem;
	position: absolute;
	transition: 0.25s;
	width: 0.7rem;
	background-color: currentcolor;
}

input {
	opacity: 0;

	&:checked + .seventv-toggle::before {
		transform: translateX(1rem);
	}
}

.seventv-toggle.round {
	border-radius: 0.25rem;
}

.seventv-toggle.round::before {
	border-radius: 0.25rem;
}
</style>
