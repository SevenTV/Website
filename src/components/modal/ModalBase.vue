<template>
	<div class="modal-backdrop">
		<div ref="modalEl" class="modal">
			<div class="modal-heading">
				<div />
				<slot name="heading" />
				<UnstyledButton class="modal-close" @click="close()">
					<Icon icon="close" />
				</UnstyledButton>
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

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { ModalEvent, useModal } from "@store/modal";
import UnstyledButton from "@base/UnstyledButton.vue";
import Icon from "../utility/Icon.vue";

const props = withDefaults(
	defineProps<{
		width?: string;
		height?: string;
		minWidth?: string;
		maxWidth?: string;
		minHeight?: string;
		maxHeight?: string;
		footerHeight?: string;
		opacity?: number;
	}>(),
	{
		opacity: 1,
	},
);
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const modal = useModal();

onMounted(() => {
	for (const k of Object.keys(props)) {
		if (!modalEl.value) {
			continue;
		}
		const v = (props as never)[k];
		if (!v) {
			continue;
		}
		modalEl.value.style.setProperty(`--modal-${k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`, v);
	}
});

const modalEl = ref<HTMLDivElement>();
onClickOutside(modalEl, () => close());
const close = () => {
	if (!modal.clickOutside) {
		return;
	}
	emit("close");
};
</script>

<style lang="scss">
@import "@scss/themes.scss";

.modal-backdrop {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;

	> .modal {
		display: flex;
		flex-direction: column;
		align-content: space-between;
		border-radius: 0.5em;
		width: var(--modal-width);
		height: var(--modal-height);
		// eslint-disable-next-lin
		min-width: var(--modal-min-width, inherit);
		// eslint-disable-next-line
		max-width: var(--modal-max-width, inherit);
		// eslint-disable-next-line
		min-height: var(--modal-min-height, inherit);
		// eslint-disable-next-line
		max-height: var(--modal-max-height, inherit);
		// eslint-disable-next-line
		opacity: var(--modal-opacity, inherit);

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
			text-align: center;
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

		> .modal-footer {
			height: var(--modal-footer-height);
		}
	}
}
</style>
