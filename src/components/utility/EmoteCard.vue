<template>
	<div v-if="emote && emote.id" ref="emoteCard" class="emote-card" tabindex="-1" :style="{ filter: borderFilter }">
		<router-link
			v-wave="{ duration: 0.2 }"
			tabindex="0"
			:to="{
					name: 'Emote',
					params: {
						emoteID: emote.id,
						emoteData: JSON.stringify(emote),
						ignoreError: (emote.lifecycle !== Emote.Lifecycle.LIVE) as unknown as string,
					},
				}"
			class="unstyled-link"
			:class="{ decorative }"
			:loading="!imageURL"
			@contextmenu.prevent="openContext"
		>
			<div class="img-wrapper" :censor="!emote.listed && !actor.hasPermission(Permissions.EditAnyEmote)">
				<img v-if="!isUnavailable" :srcset="srcset" />
				<img v-else src="@img/question.webp" />
			</div>
			<div class="img-gap" />
			<div class="title-banner">
				<span>{{ alias || emote.name }}</span>
			</div>
			<div v-if="emote.owner" class="title-banner submitter">
				<UserTag :user="emote.owner" :hide-avatar="true"></UserTag>
			</div>
			<div v-if="alias && emote.name !== alias" class="title-banner alias-og">
				<span>
					<span class="aka">aka</span>
					<span class="og-name"> {{ emote?.name }} </span>
				</span>
			</div>
		</router-link>

		<div class="state-indicator-list">
			<div class="state-indicator-wrapper">
				<div v-if="emoteActor" class="state-indicator actor-indicator">
					<Tooltip :text="t('emote_set.label_actor', [emoteActor.display_name])" position="right-end">
						<img :src="emoteActor.avatar_url" class="emote-actor" />
					</Tooltip>
				</div>

				<TransitionGroup name="fade">
					<div v-for="ind of indicators" :key="ind.icon" class="state-indicator">
						<Tooltip :text="ind.tooltip" position="right-end">
							<div>
								<div class="icon" :style="{ color: ind.color }">
									<Icon :icon="ind.icon" />
								</div>
							</div>
						</Tooltip>
					</div>
				</TransitionGroup>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="emote-card"></div>
	</div>
</template>

<script setup lang="ts">
import { Emote } from "@structures/Emote";
import { computed, inject, ref, watch } from "vue";
import { useActorStore } from "@store/actor";
import { useI18n } from "vue-i18n";
import { Permissions } from "@/structures/Role";
import { useModal } from "@/store/modal";
import { useMutationStore } from "@/store/mutation";
import type { ContextMenuFunction } from "@/context-menu";
import { User } from "@/structures/User";
import UserTag from "@components/utility/UserTag.vue";
import Tooltip from "@components/utility/Tooltip.vue";
import EmoteCardContext from "@components/utility/EmoteCardContext.vue";
import SelectEmoteSet from "../modal/SelectEmoteSet/SelectEmoteSet.vue";
import Icon from "./Icon.vue";

const props = withDefaults(
	defineProps<{
		emote: Emote;
		emoteActor?: User;
		scale?: string;
		alias?: string;
		unload?: boolean;
		decorative?: boolean;
	}>(),
	{
		emote: () => ({ id: "" } as Emote),
		scale: "10em",
	},
);

const { t } = useI18n();

const borderFilter = computed(() =>
	indicators.value.map(({ color }) => `drop-shadow(0.03em 0.03em 0.075em ${color})`).join(" "),
);
const actor = useActorStore();
const ae = computed(() => actor.activeEmotes.get(props.emote?.id as string));

const indicators = computed(() => {
	let list = [] as Indicator[];
	if (ae.value) {
		list.push({
			icon: "check",
			tooltip: `Added to ${actor.defaultEmoteSet?.name}`,
			color: "#9146ff",
		});
	}
	if (emote.value.listed === false) {
		list.push({
			icon: "eye-slash",
			tooltip: "Unlisted",
			color: "#eb3d26",
		});
	}
	if (Emote.IsZeroWidth(props.emote)) {
		list.push({
			icon: "object-group",
			tooltip: "Zero-Width Emote",
			color: "goldenrod",
		});
	}
	if (Emote.IsPrivate(props.emote)) {
		list.push({
			icon: "lock",
			tooltip: "Private Emote",
			color: "#878787",
		});
	}
	if (props.alias && props.alias !== props.emote.name) {
		list.push({
			icon: "tag",
			tooltip: "Renamed In Set",
			color: "aquamarine",
		});
	}
	if (emote.value.trending) {
		list.push({
			icon: "fire",
			tooltip: t("emote.trending_rank", [emote.value.trending]),
			color: "#ff9632",
		});
	}

	if (isUnavailable.value) {
		list = [
			{
				icon: "trash",
				tooltip: "No Longer Available",
				color: "darkred",
			},
		];
	}
	return list;
});

const isUnavailable = computed(
	() => typeof props.emote.lifecycle === "number" && props.emote.lifecycle !== Emote.Lifecycle.LIVE,
);

const modal = useModal();
const m = useMutationStore();

const emoteCard = ref<HTMLDivElement>();
const ctxMenuUtil = inject<ContextMenuFunction>("ContextMenu");
const openContext = (ev: MouseEvent) => {
	if (typeof ctxMenuUtil !== "function") {
		return;
	}

	ctxMenuUtil(ev, EmoteCardContext, { emote: props.emote }).then((v) => {
		switch (v) {
			case "use-add": {
				const set = actor.defaultEmoteSet;
				if (!set || !actor.defaultEmoteSetID) {
					break;
				}

				m.setEmoteInSet(actor.defaultEmoteSetID, "ADD", props.emote.id).catch(actor.showErrorModal);
				break;
			}
			case "use-del": {
				const set = actor.defaultEmoteSet;
				if (!set || !actor.defaultEmoteSetID) {
					break;
				}

				m.setEmoteInSet(actor.defaultEmoteSetID, "REMOVE", props.emote.id).catch(actor.showErrorModal);

				break;
			}
			case "use-select":
				modal.open("emote-set-select-at-card", {
					component: SelectEmoteSet,
					events: {
						change: (action, id, cb, name?) => {
							m.setEmoteInSet(id, action, props.emote.id, name).then(cb).catch(actor.showErrorModal);
						},
					},
					props: { emote: props.emote },
				});
				break;

			default:
				break;
		}
	});
};

const unload = computed(() => props.unload);

const imageURL = ref("");
const srcset = ref("");

const emote = computed(() => props.emote);
let img: HTMLImageElement | null;
watch(
	emote,
	(e) => {
		imageURL.value = "";
		if (img) {
			img.src = "";
		}
		if (unload.value) {
			return;
		}
		img = new Image();
		img.onload = () => {
			imageURL.value = (img as HTMLImageElement).src as string;
		};

		img.src = Emote.GetImage(e.images, actor.preferredFormat, "1x")?.url as string;

		srcset.value = [2, 3, 4]
			.map((im) => Emote.GetImage(e.images ?? [], actor.preferredFormat, `${im}x` as Emote.Size))
			.map((im, i) => `${im?.url ?? ""} ${i + 1}x`)
			.join(", ");
	},
	{ immediate: true },
);

watch(
	unload,
	(v) => {
		if (!v) {
			return undefined;
		}

		imageURL.value = "";
	},
	{ immediate: true },
);

interface Indicator {
	icon: string;
	tooltip: string;
	color: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-card > a {
	display: flex;
	width: v-bind(scale);
	height: v-bind(scale);
	cursor: pointer;
	border: solid 0.1em;
	border-color: transparent;
	border-radius: 0.1em;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	-webkit-user-drag: none;
	user-select: none;

	@include themify() {
		background-color: darken(themed("backgroundColor"), 2);
	}

	&:hover {
		border-color: currentColor;
	}
	&:focus {
		@include themify() {
			background-color: darken(darken(themed("backgroundColor"), 2), 6);
		}
	}

	transition: border-color 200ms ease-out;

	// text values in the card
	.title-banner {
		height: 1em;
		max-width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		> span {
			font-family: Ubuntu, sans-serif;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 0.3em;
			margin-right: 0.3em;
		}

		&.alias-og {
			color: gray;
			font-size: 0.65em;
			margin-top: 0.1em;
			span.aka {
				margin-right: 0.3em;
			}
			span.og-name {
				font-weight: 600;
			}
		}
		&.submitter {
			margin-top: 0.25em;
			font-size: 0.75em;
			width: 80%;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}
	}

	// Spacing between the image and other content
	.img-gap {
		height: 1em;
	}

	.img-wrapper {
		display: flex;
		justify-content: center;
		height: 50%;

		&[censor="true"] {
			filter: blur(0.5em);
			image-rendering: pixelated;
		}

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
			min-width: 5em;
			max-width: 55%;
			object-fit: scale-down;
			pointer-events: none;
		}
	}

	&.decorative {
		pointer-events: none;
	}
}

.state-indicator-list {
	position: absolute;

	.state-indicator-wrapper {
		position: relative;
		bottom: calc(v-bind(scale) - 0.25em);
		left: -0.5em;
		display: flex;
		flex-direction: column;
	}

	.emote-actor {
		border-radius: 50%;

		width: 1.1rem;
	}
}
</style>
