<template>
	<div ref="container" v-click-outside="shouldClose" class="app-context-menu">
		<component :is="component" v-bind="innerProps" />
	</div>
	<div ref="trigger" />
</template>

<script lang="ts">
import { VirtualElement, createPopper } from "@popperjs/core";
import {
	Component,
	ComponentPropsOptions,
	computed,
	defineComponent,
	onBeforeUnmount,
	onMounted,
	PropType,
	ref,
} from "vue-demi";

export default defineComponent({
	emits: ["close"],
	props: {
		open: Boolean,
		component: {
			type: Object as PropType<Component>,
			required: true,
		},
		innerProps: {
			type: Object as PropType<ComponentPropsOptions>,
			required: true,
		},
		position: {
			type: Object as PropType<Position>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const isShown = computed(() => props.open);
		const trigger = {
			getBoundingClientRect: () => ({
				width: 0,
				height: 0,
				top: props.position.y,
				right: props.position.x,
				bottom: props.position.y,
				left: props.position.x,
			}),
		} as VirtualElement;
		const container = ref<HTMLDivElement>();

		const contextMenuListener = (ev: MouseEvent) => {
			ev.preventDefault();
			shouldClose(ev);
		};
		onMounted(() => {
			const popper = createPopper(trigger as VirtualElement, container.value as HTMLDivElement, {});
			popper.forceUpdate();

			setTimeout(() => document.addEventListener("contextmenu", contextMenuListener), 0);
		});
		onBeforeUnmount(() => {
			document.removeEventListener("contextmenu", contextMenuListener);
		});

		const shouldClose = (ev: MouseEvent) => {
			ev.preventDefault();
			emit("close");
		};
		return {
			isShown,
			trigger,
			container,
			shouldClose,
		};
	},
});

interface Position {
	x: number;
	y: number;
}
</script>

<style lang="scss" scoped>
.app-context-menu {
	pointer-events: all;

	> [hidden="true"] {
		visibility: hidden;
	}
}
</style>
