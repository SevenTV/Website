<template>
	<div class="modal-backdrop">
		<div class="modal">
			<div class="modal-heading">
				<div />
				<slot name="heading" />
				<div class="modal-close" @click="$emit('close')">
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["close"],
});
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

	transition: backdrop-filter 0.6s;
	backdrop-filter: blur(24px);

	> .modal {
		overflow: hidden;
		border-radius: 0.5em;
		width: var(--modal-width, 48em);
		height: var(--modal-height, 36em);
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
	}
}
</style>
