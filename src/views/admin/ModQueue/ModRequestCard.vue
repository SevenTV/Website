<template>
	<div class="mod-request-card" :kind="ObjectKind[request.target_kind]" :read="read">
		<!-- Emote Request -->
		<template v-if="request.target_kind === ObjectKind.EMOTE">
			<div v-if="read" class="read-check">
				<Icon v-if="decision === 'approve'" size="xl" icon="check" />
				<Icon v-if="decision === 'unlist'" size="xl" icon="eye-slash" />
				<Icon v-if="decision === 'delete'" size="xl" icon="trash" />
			</div>
			<div selector="preview" @click.prevent="expand">
				<EmoteCard :decorative="true" scale="8em" :emote="(target as Emote)" />
			</div>

			<div v-if="!read" class="actions">
				<button
					v-for="b of reqAttr.buttons"
					:key="b.name"
					:name="b.name"
					:class="{ decided: decision === b.name }"
					@click="emitDecision(b.name)"
				>
					<Icon :icon="b.icon" />
				</button>
			</div>
			<div v-else class="actions">
				<button name="undo" @click="undoDecision">
					<Icon icon="undo" />
				</button>
			</div>

			<div class="info">
				<div v-if="target && target.tags" selector="tag-list">
					<EmoteTagList :emote="(target as Emote)" />
				</div>
				<span class="id-copy" @click="copyID">
					<Icon icon="copy" />
				</span>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { useModal } from "@/store/modal";
import { ImageFormat, ObjectKind } from "@/structures/Common";
import type { Emote } from "@/structures/Emote";
import type { Message } from "@/structures/Message";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import Icon from "@/components/utility/Icon.vue";
import ModRequestCardDetailsModalVue from "./ModRequestCardDetailsModal.vue";

export interface ModRequestAttr {
	title: string;
	buttons: {
		name: string;
		icon: string;
	}[];
}

const EmoteTagList = defineAsyncComponent(() => import("@/views/emote-upload/EmoteTagList.vue"));

const emit = defineEmits<{
	(e: "select", ev: MouseEvent, request: Message.ModRequest): void;
	(e: "decision", t: string, undo?: boolean): void;
}>();

const props = defineProps<{
	request: Message.ModRequest;
	target: Emote | null;
	read?: boolean;
}>();

const requestMapping = {
	list: {
		title: "Request to list emote",
		buttons: [
			{ name: "approve", icon: "check" },
			{ name: "unlist", icon: "eye-slash" },
			{ name: "delete", icon: "trash" },
		],
	},
	personal_use: {
		title: "Request to use emote in personal sets",
		buttons: [
			{ name: "validate", icon: "circle-check" },
			{ name: "deny", icon: "times" },
		],
	},
};
const reqAttr = ref<ModRequestAttr>(requestMapping[props.request.wish]);

const authorColor = props.request.author?.style.color
	? ConvertIntColorToHex(props.request.author.style.color ?? 0, 0.25)
	: "";

const copyID = () => {
	navigator.clipboard.writeText(props.request.id);
};

const modal = useModal();
const expand = () => {
	modal.open("mod-request-details", {
		component: ModRequestCardDetailsModalVue,
		events: {
			approve: () => emitDecision("approve"),
			unlist: () => emitDecision("unlist"),
			delete: () => emitDecision("delete"),
		},
		props: {
			request: props.request,
			format: ImageFormat.WEBP,
			attr: reqAttr.value,
		},
	});
};

const decision = ref("");

const emitDecision = (t: string, undo?: boolean) => {
	emit("decision", t, undo);

	decision.value = t;
};

const undoDecision = () => {
	switch (decision.value) {
		case "approve":
			emitDecision("unlist", true);
			break;
		case "unlist":
			emitDecision("none", true);
			break;
		case "delete":
			emitDecision("undelete", true);
			break;
	}

	decision.value = "";
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

div.mod-request-card {
	border-radius: 0.1em;
	min-height: 8em;

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 2);

		&[read="true"] {
			border: 1px solid transparentize(darken(themed("accent"), 2), 0.75);
			background-color: transparentize(lighten(themed("backgroundColor"), 2), 0.75);
		}

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
						&:hover,
						&.decided {
							background-color: transparentize($color, 0.88);
						}
					}
					&[name="unlist"] {
						$color: adjust-hue(themed("warning"), 30);

						color: $color;
						&:hover,
						&.decided {
							background-color: transparentize($color, 0.88);
						}
					}
					&[name="delete"] {
						$color: themed("warning");

						color: $color;
						&:hover,
						&.decided {
							background-color: transparentize($color, 0.88);
						}
					}
					&[name="undo"] {
						$color: themed("primary");

						color: $color;
						&:hover {
							background-color: transparentize($color, 0.88);
						}
					}

					&[name="validate"] {
						$color: themed("accent");

						color: $color;
						&:hover,
						&.decided {
							background-color: transparentize($color, 0.88);
						}
					}

					&[name="deny"] {
						$color: themed("warning");

						color: $color;
						&:hover,
						&.decided {
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

	&[read="true"] {
		> [selector="preview"] {
			opacity: 0.25;
		}
	}

	.read-check {
		position: absolute;
		width: 6.5em;
		height: calc(6.5em - 0.1em);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25em;
		color: lime;
		backdrop-filter: blur(5em);

		> svg {
			width: 1em;
			height: 1em;
			border: 0.15em solid currentColor;
			background-color: black;
			padding: 0.25em;
			border-radius: 50%;
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

				&:focus,
				&.decided {
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

		[selector="tag-list"] {
			margin: 0.5em;
		}
	}
}
</style>
