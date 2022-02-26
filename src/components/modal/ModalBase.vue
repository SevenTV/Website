<template>
	<div class="modal-backdrop">
		<div ref="modal" class="modal">
			<div class="modal-heading">
				<div />
				<slot name="heading" />
				<div class="modal-close" @click="close()">
					<font-awesome-icon :icon="['fas', 'close']" />
				</div>
			</div>

			<div class="modal-content">
				<slot name="content" />
			</div>

			<div class="modal-footer">
				<slot name="footer" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { animate } from "motion";

const props = defineProps({
	width: String,
	height: String,
	minWidth: String,
	maxWidth: String,
	minHeight: String,
	maxHeight: String,
});
const emit = defineEmits(["close"]);
onMounted(() => {
	animate(".modal", { scale: [0.25, 1], opacity: [0, 0.5, 1] }, { duration: 0.25 });

	for (const k of Object.keys(props)) {
		if (!modal.value) {
			continue;
		}
		const v = (props as never)[k];
		if (!v) {
			continue;
		}
		modal.value.style.setProperty(`--modal-${k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`, v);
	}
});

const modal = ref<HTMLDivElement>();
onClickOutside(modal, () => close());
const close = async () => {
	await animate(".modal", { scale: [1, 0], opacity: [1, 0.5, 0] }, { duration: 0.25 }).finished;
	emit("close");
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.modal-backdrop {
	position: fixed;
	z-index: 100;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 50%);

	> .modal {
		display: flex;
		flex-direction: column;
		align-content: space-between;
		border-radius: 0.5em;
		width: var(--modal-width, 48em);
		height: var(--modal-height, 36em);
		// eslint-disable-next-lin
		min-width: var(--modal-min-width, inherit);
		// eslint-disable-next-line
		max-width: var(--modal-max-width, inherit);
		// eslint-disable-next-line
		min-height: var(--modal-min-height, inherit);
		// eslint-disable-next-line
		max-height: var(--modal-max-height, inherit);
		@media screen and (max-width: var(--modal-width, 48em)) {
			width: calc(100vw - 1em);
		}
		@include themify() {
			background-color: themed("backgroundColor");
		}

		clip-path: polygon(
			0% 1.5em,
			1.5em 0%,
			calc(100% - 1.5em) 0%,
			100% 1.5em,
			100% calc(100% - 1.5em),
			calc(100% - 1.5em) 100%,
			1.5em 100%,
			0 calc(100% - 1.5em)
		);

		> .modal-heading {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 3em;

			@include themify() {
				background-color: darken(themed("backgroundColor"), 2);
			}

			> .modal-close {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				cursor: pointer;
				padding: 0.5em;
				font-size: 2em;

				> svg {
					margin-right: 0.25em;
				}
				@include themify() {
					background-color: themed("warning");
				}
			}
		}

		> .modal-content {
			display: flex;
			flex-grow: 1;
		}
	}
}
</style>
