<template>
	<div class="active-modals">
		<component
			:is="m.component"
			v-for="[k, m] of modal.components"
			:key="k"
			v-bind="m.props"
			@modal-event="onEvent(m, $event)"
			@close="onClose(k)"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { Modal, ModalEvent, useModal } from "@/store/modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineEmits<{ (t: string, ...args: any[]): void }>();
const modal = useModal();

// handle close event
const onClose = (k: symbol) => modal.close(k);
// dynamic events (pass to modal opener)
const onEvent = (m: Modal, e: ModalEvent) => {
	const f = m.events?.[e.name];
	if (typeof f === "function") {
		f(...e.args);
	}
};
</script>

<style lang="scss" scoped>
.active-modals {
	position: absolute;
}
</style>
