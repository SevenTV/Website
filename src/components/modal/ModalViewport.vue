<template>
	<div class="modal-viewport" :darken="darken">
		<div
			v-for="[k, m] of components"
			:key="k"
			:animate="{ scale: [0, 0.5, 1], transition: { duration: 0.15 } }"
			class="modal-state"
			role="dialog"
			aria-modal="true"
			:aria-labelledby="(m.name ?? 'dialog') + '-title'"
			:modal-name="k"
		>
			<Transition appear name="zoom">
				<component
					:is="m.component"
					v-if="!out"
					v-bind="m.props"
					@modal-event="onEvent(m, $event)"
					@close="onClose(k)"
				/>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Modal, ModalEvent, useModal } from "@store/modal";
import { storeToRefs } from "pinia";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineEmits<{ (t: string, ...args: any[]): void }>();
const modal = useModal();
const { components } = storeToRefs(modal);
const darken = computed(() => components.value.size > 0);

// handle close event
const out = ref(false);
const onClose = async (k: string) => {
	if (k !== currentModal.value) {
		return;
	}
	if (components.value.size <= 1) {
		out.value = true;
		await new Promise((ok) => setTimeout(() => [ok(null), (out.value = false)], 150));
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
@import "@scss/transition.scss";

.modal-viewport {
	display: none;
	position: fixed;
	width: 100%;
	height: 100%;
	&[darken="true"] {
		display: block;
		z-index: 1000;
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
