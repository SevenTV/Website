<template>
	<transition name="card" mode="out-in" appear>
		<div class="emote-card" tabindex="0">
			<router-link :to="{ name: 'Emote', params: { emote: emote.id } }" class="unstyled-link">
				<div class="title-banner">
					<span>{{ emote?.getName() }}</span>
				</div>

				<div class="title-banner submitter">
					<span :style="{ color: emote.owner?.getRoleColor() }">{{ emote?.owner?.getDisplayName() }}</span>
				</div>

				<div class="img-wrapper">
					<img :src="emote.getURL('3') ?? 'unknown'" />
				</div>
			</router-link>

			<div class="state-indicator" v-if="indicator.icon">
				<Tooltip :text="indicator.tooltip" position="top">
					<div>
						<div class="icon" :style="{ color: indicator.color }">
							<font-awesome-icon :icon="['fas', indicator.icon]" />
						</div>
					</div>
				</Tooltip>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Emote } from "@/structures/Emote";
import { defineComponent, PropType, ref } from "vue";
import Tooltip from "@/components/utility/Tooltip.vue";

export default defineComponent({
	components: {
		Tooltip,
	},
	props: {
		emote: {
			type: Object as PropType<Emote>,
			required: true,
		},
	},

	setup(props) {
		const indicator = ref({
			icon: "",
			color: "",
		} as Indicator);
		if (props.emote.isGlobal()) {
			indicator.value.icon = "star";
			indicator.value.tooltip = "Global Emote";
			indicator.value.color = "#b2ff59";
		}

		return {
			indicator,
		};
	},
});

interface Indicator {
	icon: string;
	tooltip: string;
	color: string;
}
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

.emote-card a {
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
		$color: darken(themed("backgroundColor"), 2);
		background-color: $color;

		&:hover {
			border-color: currentColor;
		}
		&:focus {
			background-color: darken($color, 6);
		}
		transition: border-color 200ms ease-out;
	}
	margin: 0.75em;

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

.state-indicator {
	display: flex;
	justify-content: center;
	position: relative;
	height: 0;
	cursor: pointer;

	:first-child {
		position: absolute;
		display: inline-flex;
		justify-content: center;
		top: -0.25em;
		align-items: center;
		height: 1.25em;
		width: 3em;
		padding-top: 0.15em;
		text-align: center;
		border-bottom-left-radius: 33%;
		border-bottom-right-radius: 33%;
		padding-bottom: 0.15em;

		.icon {
			@include themify() {
				background-color: themed("backgroundColor");
			}
			:first-child {
				top: -0.05em;
			}
		}
	}
}
</style>
