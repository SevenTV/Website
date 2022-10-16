<template>
	<div ref="container" class="app-context-menu">
		<component :is="component" v-bind="innerProps" @ctx-interact="interact($event)" />
	</div>
	<div ref="trigger" />
</template>

<script setup lang="ts">
import { VirtualElement, createPopper } from "@popperjs/core";
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { Component, ComponentPropsOptions } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
	open: boolean;
	component: Component;
	innerProps: ComponentPropsOptions;
	position: {
		x: number;
		y: number;
	};
}>();
const emit = defineEmits(["close", "ctx-interact"]);

const container = ref<HTMLDivElement>();

const contextMenuListener = (ev: MouseEvent) => {
	ev.preventDefault();
	shouldClose(ev);
};
onMounted(() => {
	const trigger = {
		getBoundingClientRect: () => ({
			width: 0,
			height: 0,
			top: props.position.y,
			right: props.position.x,
			bottom: props.position.y,
			left: props.position.x,
		}),
		contextElement: container.value,
	} as VirtualElement;

	const popper = createPopper(trigger as VirtualElement, container.value as HTMLDivElement, {});
	popper.forceUpdate();

	setTimeout(() => document.addEventListener("contextmenu", contextMenuListener), 0);
});
onBeforeUnmount(() => {
	document.removeEventListener("contextmenu", contextMenuListener);
});

const shouldClose = (ev: PointerEvent | MouseEvent) => {
	ev.stopPropagation();
	emit("close");
};

onClickOutside(container, shouldClose);

const interact = (s: string): void => {
	emit("ctx-interact", s);
	emit("close");
};
</script>

<style lang="scss" scoped>
.app-context-menu {
	pointer-events: all;

	> [hidden="true"] {
		visibility: hidden;
	}
}
</style>
