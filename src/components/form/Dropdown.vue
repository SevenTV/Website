<template>
	<div class="dropdown" :tabindex="tabindex" @keyup="onKeyboardWrite">
		<div ref="dropdown" class="dropdown-selected" @click="open = !open">
			<span> {{ selected.name }} </span>
			<span class="drop-arrow-icon">
				<Icon size="lg" icon="chevron-down" />
			</span>
		</div>

		<div class="options" :open="open">
			<option
				v-for="(opt, index) of options"
				:id="`dropdown${instID}-opt-${index}`"
				:key="opt.id"
				:tabindex="index"
				:class="{ selected: selected.id === opt.id }"
				class="item"
				@click.prevent="selectOption(opt)"
				@keyup.enter="selectOption(opt)"
			>
				<span> {{ opt.name }} </span>
			</option>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
import Icon from "../utility/Icon.vue";

const instID = Math.random().toString(36).substring(7);

const emit = defineEmits(["update:modelValue", "blur"]);

const props = defineProps<{
	modelValue?: string;
	options: OptionData[];
	width?: string;
	tabindex?: number;
	defaultValue?: OptionData;
}>();

const selected = ref<OptionData>(props.defaultValue ?? props.options[0]);

const open = ref(false);

const dropdown = ref<HTMLDivElement>();
const dropdownWidth = ref("");

onMounted(() => {
	dropdownWidth.value = `${dropdown.value?.offsetWidth ?? 0}px`;
});

onClickOutside(dropdown, () => (open.value = false));

const selectOption = (val: OptionData) => {
	selected.value = val;
	emit("update:modelValue", val.id);
	open.value = false;

	setTimeout(() => {
		dropdownWidth.value = `${dropdown.value?.offsetWidth ?? 0}px`;
	}, 0);
};

let buf = "";
const onKeyboardWrite = (ev: KeyboardEvent) => {
	const k = ev.key;
	if (!k.match(/[a-z]/)) {
		return;
	}

	buf += k;

	// Find match
	let ind = 0;
	const opt = props.options.find((o, i) => {
		ind = i;
		return o.name.toLowerCase().startsWith(buf);
	});
	if (!opt) {
		buf = "";
	}

	const el = document.getElementById(`dropdown${instID}-opt-${ind}`);
	if (buf && el && opt) {
		el.scrollIntoView();
		el.focus();
		selected.value = opt;
	}
};

interface OptionData {
	id: string;
	name: string;
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
.dropdown {
	width: v-bind(width);
	z-index: 50;

	@include themify() {
		> div.dropdown-selected {
			border-color: mix(themed("backgroundColor"), themed("color"), 85);
			background-color: lighten(themed("backgroundColor"), 4);

			transition: border-color 200ms ease;
			&:hover {
				border-color: mix(themed("backgroundColor"), themed("color"), 25);
			}
			&:focus {
				border-color: inherit;
			}
		}

		> div.options {
			background-color: lighten(themed("backgroundColor"), 4);

			> option:hover {
				background-color: darken(themed("backgroundColor"), 4);
			}
			> option.selected {
				background-color: darken(themed("backgroundColor"), 4);
			}
		}
	}

	> div.dropdown-selected {
		cursor: pointer;
		padding: 0.5em;
		border-radius: 0.25em;
		border: 0.1em solid;
		white-space: nowrap;

		display: flex;
		justify-content: space-between;
	}

	div.options {
		width: v-bind("dropdownWidth");
		position: absolute;

		> option {
			cursor: pointer;
			padding: 0.5em;
			overflow-x: hidden;
		}
	}

	> div.options[open="false"] {
		display: none;
	}

	> div.options[open="true"] {
		max-height: 16em;
		overflow: auto;
	}
}
</style>
