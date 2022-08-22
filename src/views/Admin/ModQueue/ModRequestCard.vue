<template>
	<div class="mod-request-card" :kind="Common.ObjectKind[request.target_kind]">
		<!-- Emote Request -->
		<template v-if="request.target_kind === Common.ObjectKind.EMOTE">
			<router-link
				:to="{ name: 'AdminModQueue', params: { requestID: request.id } }"
				class="unstyled-link"
				selector="preview"
			>
				<EmoteCard :decorative="true" scale="8em" :emote="(request.target as Emote)" />
			</router-link>

			<div class="actions">
				<!-- Approve -->
				<button name="approve">
					<Icon icon="check" />
				</button>

				<!-- Unlist -->
				<button name="unlist">
					<Icon icon="eye-slash" />
				</button>

				<!-- Delete -->
				<button name="delete">
					<Icon icon="trash" />
				</button>
			</div>

			<div class="info">
				<span class="id-copy" @click="copyID">
					<Icon icon="copy" />
				</span>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { Common } from "@/structures/Common";
import { Message } from "@/structures/Message";
import { Emote } from "@/structures/Emote";
import { ref } from "vue";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import Icon from "@/components/utility/Icon.vue";

const props = defineProps<{
	request: Message.ModRequest;
}>();

const request = ref(props.request);

const authorColor = request.value.author?.tag_color
	? ConvertIntColorToHex(request.value.author.tag_color ?? 0, 0.25)
	: "";

const copyID = () => {
	navigator.clipboard.writeText(request.value.id);
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

div.mod-request-card {
	overflow: hidden;
	border-radius: 0.25em;

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 2);

		&[kind="EMOTE"] {
			&:hover {
				background-color: lighten(themed("backgroundColor"), 2.5);
			}

			> .actions {
				background-color: darken(themed("backgroundColor"), 0.5);

				button {
					&[name="approve"] {
						$color: themed("accent");

						color: $color;
						&:hover {
							background-color: transparentize($color, 0.88);
						}
					}
					&[name="unlist"] {
						$color: adjust-hue(themed("warning"), 30);

						color: $color;
						&:hover {
							background-color: transparentize($color, 0.88);
						}
					}
					&[name="delete"] {
						$color: themed("warning");

						color: $color;
						&:hover {
							background-color: transparentize($color, 0.88);
						}
					}
				}
			}
		}
	}

	border: 0.1em solid v-bind(authorColor);

	> div[selector="preview"] {
		cursor: pointer;

		&:hover {
			filter: brightness(150%);
		}
	}

	&[kind="EMOTE"] {
		display: grid;
		grid-template-columns: 8em 4em auto;

		&:hover {
			> .actions {
				opacity: 1;
			}

			> .info > .id-copy {
				visibility: visible;
			}
		}

		> .actions {
			display: grid;
			column-gap: 1em;
			opacity: 0.33;
			transition: opacity 90ms ease-in-out;

			> button {
				all: unset;
				width: 100%;
				cursor: pointer;

				&:focus {
					border: 0.1em solid currentColor;
				}
			}
		}
	}

	.info {
		display: flex;
		flex-direction: column;

		> .id-copy {
			cursor: pointer;
			visibility: hidden;
			margin: 0.5em;
			text-align: end;
		}
	}
}
</style>
