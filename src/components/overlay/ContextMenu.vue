<template>
	<div ref="container" class="app-context-menu" :style="{ left: `${options.x}px`, top: `${options.y}px` }">
		<component :is="component" v-bind="innerProps" @ctx-interact="interact($event)" />
	</div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import type { Component, ComponentPropsOptions } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useContextMenu } from "@/composable/context-menu";

defineProps<{
	open: boolean;
	component: Component;
	innerProps: ComponentPropsOptions;
}>();
const emit = defineEmits(["close", "ctx-interact"]);

const container = ref<HTMLDivElement>();

const contextMenuListener = (ev: MouseEvent) => {
	ev.preventDefault();
	shouldClose(ev);
};

const { options } = useContextMenu();

onMounted(() => {
	nextTick(() => document.addEventListener("contextmenu", contextMenuListener));
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
	position: absolute;
	pointer-events: all;

	> [hidden="true"] {
		visibility: hidden;
	}
}
</style>
