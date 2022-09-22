<template>
	<div class="text-input" :appearance="appearance">
		<input
			ref="inputEl"
			:type="type"
			:error="error"
			:autofocus="autofocus"
			:value="modelValue"
			:empty="typeof modelValue === 'string' ? !modelValue?.length : typeof modelValue !== 'number'"
			@input="onInput"
			@blur="emit('blur')"
		/>
		<label class="input-name">
			<Icon v-if="icon" :icon="icon" />
			<span> {{ label }} </span>
		</label>
		<label class="input-hint">
			<slot name="hint" />
		</label>
		<label class="input-error">
			<slot name="error" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Icon from "../utility/Icon.vue";

const props = withDefaults(
	defineProps<{
		label?: string;
		modelValue?: string | number;
		type?: "text" | "password" | "email" | "number" | "url";
		icon?: string;
		error?: boolean;
		width?: string;
		appearance?: "flat" | "outline";
		autofocus?: boolean;
	}>(),
	{
		type: "text",
		appearance: "outline",
	},
);

const emit = defineEmits(["update:modelValue", "blur"]);
const onInput = (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value);

const inputEl = ref<HTMLInputElement | null>(null);

onMounted(() => {
	if (inputEl.value && props.autofocus) {
		inputEl.value.focus();
	}
});
</script>

<style lang="scss">
@import "@scss/themes.scss";

.text-input {
	position: relative;
	width: v-bind(width);

	@include themify() {
		input[error="true"] {
			border-color: themed("warning") !important;
		}

		&[appearance="outline"] {
			input {
				background-color: lighten(themed("backgroundColor"), 4);
				border-color: mix(themed("backgroundColor"), themed("color"), 85);
			}
		}
		&[appearance="flat"] {
			input {
				border: none;
				border-bottom: 0.1em solid;
				border-radius: 0;
				border-color: currentColor;
			}
		}

		input:focus {
			border-color: mix(themed("primary"), themed("backgroundColor"), 80);
		}

		label.input-hint {
			color: mix(themed("backgroundColor"), themed("color"), 33);
		}
		label.input-error {
			color: lighten(themed("warning"), 3);
		}
	}

	label.input-name {
		pointer-events: none;
		position: absolute;
		top: 0.6em;
		left: 0;
		transition: transform 200ms ease;
		margin-left: 0.5em;

		> svg {
			margin-right: 0.33em;
		}
	}

	label.input-hint,
	label.input-error {
		display: block;
		position: absolute;
		top: 3.5em;
		max-width: 100%;
		left: 0;
		text-align: center;
		word-wrap: break-word;
	}

	input {
		transition: border-color 140ms ease-in-out;
		background-color: transparent;
		color: inherit;
		border-width: 0.05em;
		border-style: solid;
		border-color: transparent;
		border-radius: 0.25em;
		padding: 0.5em;
		font-size: 1em;
		font-weight: 500;
		width: 100%;
	}

	input[empty="false"],
	input:focus {
		outline: unset;
		& ~ label {
			font-weight: 600;
			transform: translateY(-1.35em) translateX(-0.25em) scale(0.8);
		}
	}
}
</style>
