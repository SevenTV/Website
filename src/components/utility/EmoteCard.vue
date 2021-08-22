<template>
	<transition name="card" mode="out-in">
		<div class="emote-card" @click="visible = !visible" v-if="visible">
			<div class="title-banner">
				<span>{{ emote?.getName() }}</span>
			</div>

			<div class="title-banner submitter">
				<span>Submitter</span>
			</div>

			<div class="img-wrapper">
				<img :src="emote.getURL('3') ?? 'unknown'" />
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Emote } from "@/structures/Emote";
import { defineComponent, onMounted, PropType, ref } from "vue";

export default defineComponent({
	props: {
		emote: {
			type: Object as PropType<Emote>,
			required: true,
		},
	},

	setup() {
		const visible = ref(false);

		onMounted(() => (visible.value = true));
		return {
			visible,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/themes.scss";

.card-enter-active,
.card-leave-active {
	transition: opacity 100ms ease-in-out;
}
.card-enter-from,
.card-leave-to {
	opacity: 0;
}

.emote-card {
	display: flex;
	width: 8.75em;
	height: 8.75em;
	cursor: pointer;
	border: groove 2px;
	border-color: transparent;
	border-radius: 3px;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@include themify() {
		background-color: darken(themed("backgroundColor"), 2);
	}
	margin: 0.5em;

	.title-banner {
		height: 1.5em;
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		@include themify() {
			background-color: lighten(themed("backgroundColor"), 8);
		}

		span {
			font-family: "Ubuntu", sans-serif;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 0.3em;
			margin-right: 0.3em;
		}

		&.submitter {
			width: 80%;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;

			span {
				font-size: 0.75em;
			}
		}
	}

	.img-wrapper {
		display: flex;
		justify-content: center;
		height: 4.5em;

		.is-processing {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-self: flex-end;
			align-items: center;

			span {
				margin-top: 1em;
			}
		}
		img {
			margin-top: 1em;
			min-width: 76px;
			max-width: 55%;
			object-fit: scale-down;
		}
	}
}
</style>
