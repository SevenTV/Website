<template>
	<div class="modal-viewport" :darken="darken">
		<Motion
			v-for="[k, m] of components"
			:key="k"
			:animate="{ scale: [0, 0.5, 1], transition: { duration: 0.15 } }"
			class="modal-state"
			:modal-name="k"
		>
			<component :is="m.component" v-bind="m.props" @modal-event="onEvent(m, $event)" @close="onClose(k)" />
		</Motion>
	</div>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref, watch } from "vue";
import { Modal, ModalEvent, useModal } from "@/store/modal";
import { storeToRefs } from "pinia";
import { Motion } from "motion/vue";
import { animate } from "motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineEmits<{ (t: string, ...args: any[]): void }>();
const modal = useModal();
const { components } = storeToRefs(modal);
const darken = computed(() => components.value.size > 0);

// handle close event
const onClose = async (k: string) => {
	if (k !== currentModal.value) {
		return;
	}
	if (components.value.size <= 1) {
		await animate(".modal-state", { scale: [1, 0.25], opacity: [1, 0.5, 0] }, { duration: 0.25 }).finished;
	}
	modal.close(k);
};

const currentModal = ref("");
watch(modal.components, (v) => {
	const ary = Array.from(v.values());
	const last = ary[ary.length - 1];

	if (last && last.name) {
		currentModal.value = last.name;
	}
});

// dynamic events (pass to modal opener)
const onEvent = (m: Modal, e: ModalEvent) => {
	const f = m.events?.[e.name];
	if (typeof f === "function") {
		f(...e.args);
	}
};
</script>

<style lang="scss" scoped>
.modal-viewport {
	display: none;
	position: fixed;
	width: 100%;
	height: 100%;
	&[darken="true"] {
		display: block;
		z-index: 100;
		background-color: rgba(0, 0, 0, 50%) !important;
	}

	.modal-state {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
