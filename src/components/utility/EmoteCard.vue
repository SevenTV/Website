<template>
	<div v-if="emote && emote.id" ref="emoteCard" class="emote-card" tabindex="-1" :style="{ filter: borderFilter }">
		<router-link
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
			@contextmenu.prevent="openContext"
		>
			<div v-wave="{ duration: 0.2 }" class="card-bg" :class="{ spooky }" :loading="!src" />

			<div class="img-wrapper" :censor="!emote.listed && !actor.hasPermission(Permissions.EditAnyEmote)">
				<img v-if="!isUnavailable" :src="src" />
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
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
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
		spooky?: boolean;
	}>(),
	{
		emote: () => ({ id: "" } as Emote),
		scale: "10em",
	},
);

const { t } = useI18n();

const borderFilter = computed(
	() =>
		indicators.value.map(({ color }) => `drop-shadow(0.03em 0.03em 0.075em ${color})`).join(" ") +
		"drop-shadow(black 1px 1px 1px)",
);

const { namedSets } = storeToRefs(useStore());
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
	// if emote is in global set
	if (namedSets.value.global[1][props.emote.id]) {
		list.push({
			icon: "star",
			tooltip: "Global Emote",
			color: "#16cc2c",
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
			case "open-in-new-tab":
				window.open(`/emotes/${props.emote.id}`, "_blank");
				break;

			default:
				break;
		}
	});
};

const unload = computed(() => props.unload);

const src = ref("");

const bgRotate = ref("");
const bgPath = ref("");

const newBorderSeed = () => {
	bgPath.value = `path("${
		[
			"M.16,50.73l7-3.28,4.05,4.37,7.18-1.24-5.77-3.13-2-5.93L0,37.46.16,6.4l3.27-.78L6.24.16H19.5l9.52,3,25.12-3H95.33l3.28,4.52L100.33.16,141.05,0l10,1.87,6.24.32,2.65,3.59s.16,53.54,0,54.16-5.46,36.84-5.46,36.84l2.5,8.12L151.66,108l5.62,1.87,2.65,9.84v28.41l-7.33,2.34-3.12-4.06.93-5.62-5.3,5.62v7.49l-8,6.09H91.75l-.94-3.9L83.32,160l-55.86-.16-16.23-2.18-5.92-.31,3.43-7.81L.16,145V111.77l3.58-11.56-3.58-3Z",
			"M4,0H62.88L79,4l28.75-4h15.37L125,5l3.5-5L145,2l1,4,11,3,3,11.5V40.38L157,44l3,6V71.75L154,70l-3,3-4-1,4,4,4-2,5,3V96.38L157,109l-4,2,7,4.5V145l-2,11s-6.25,4-7.62,4H119l-18-3v-4l3-3-5,1-2,5-8.5,4H52l-10-5H35l-10-3-14,8H0l3-8L0,121v-9.25L6,106l-6,1V62.17L2,61H7l6-4H8L4,54,0,51V21L6,10Z",
			"M160,16.5c-.88.12-4.88,4.75-4.88,4.75L160,31.38V63.62l-4.88,6-5.5-.87,4,4.75,6.38-1V134l-4.62,10.5,2.12,6.25-5.62,2-1.38,4.13L141,160H114.25l-3.63-5.88-8.87,2.5-6.13-4s-2.37,4.26-3,4.38-14,3-14,3H21.25L9.88,157l-5.76,1L0,150.62v-11L5.62,138l5.76,2.12,4.62-3-4.5.26-4.75-4L0,131l1.12-27.12L4.38,97,0,90.88V49.12l5.88-4.37,4.62,2L5.5,40,0,40.75V10.5L2.38,2.75,6,6.38,14.12,0H36.88l3,4.38L47.25,0H87.38l2.74,4.38L110.38,0h22.81l3,2.31v4.5l-1.84,7.07,5.55-5.36.79-5.21L143.25,0h8.37l4.5,2.25,3.88.13-1.62,6.37Z",
			"M0,14.88,3.75,0H14l3.75,3.88,3-3.88H59.5l5.62,4.12,8,2.26L80,0h51.12l5.38,5.88L133.33,14l12,4.67-6.66-7,3.66-6L143.75,0h8l1.63,4.88L160,12.25V38.12l-4.62,9.26L160,55.62V85.25l-5.62,2.25L160,89.62v29.26L155.25,125s-6.5-1.5-6.5-1,2.25,8.38,2.25,8.38l9-4.76v19.26l-5.38,6.87,1.13,3.37-6.13-2.5L145.75,160h-23.5l.87-7.12L114.75,160H92.25L80,154.62,49,160H17.62l3.63-6.62,7.25.74-6.62-6.37-6.5,6.5-10,3.5L0,151.38v-30.5l5.38-10.5L0,107V67.5l6.38-5.88L2.75,51.12l3.63-10L0,37Z",
			"M1.73,3.73,6,0H25.38L31.5,4.5l-4,5,5,7V9.12l5-3.62-3-4L36.92,0H65.17L77.5,4.5l8-2,5,4L101.25,0H146l9.5,1.5,4.5,6-3.5,6L160,23.58a.28.28,0,0,1,0,.09v2.89l-1.75,4.36-1.83,2.5-5.17-4.5-7.92,1.66,7.35,2.64,4.07,5.86L160,40.67V66.38L156.5,86.5,160,99.75V124l-6.5,3.5,6.5,5v10.62l-3.38,12.5-4.87-3-3,7.38h-44l.75-4.75-4.12-3.87,3.62-4-9,2.12,4.38,5.5-9.13,5H41.75l-12.63-6.12L18.75,160l-4.37-3.25L9.62,160H0V149.25l7.25-17L0,134.75V78.38l7.64-.8L0,70.5V41.62L4.88,25.25,0,14.5,2.38,7.88Z",
		][Math.floor(Math.random() * 4)]
	}")`;

	bgRotate.value = `rotate(${[0, 90, 180, 270][Math.floor(Math.random() * 3)]}deg)`;
};

const emote = computed(() => props.emote);
watch(
	emote,
	(e) => {
		src.value = "";
		if (unload.value) {
			return;
		}

		src.value = Emote.GetImage(e.images, actor.preferredFormat, "2x")?.url as string;

		// halloween design ✨🎃👻✨
		newBorderSeed();
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

	.card-bg {
		position: absolute;
		height: v-bind(scale);
		width: v-bind(scale);
		z-index: -1;

		&.spooky {
			transform: v-bind(bgRotate);
			clip-path: v-bind(bgPath);
		}

		@include themify() {
			background-color: darken(themed("backgroundColor"), 2);
		}
	}

	&:hover {
		filter: drop-shadow(white 0.03em 0.03em 0.075em);
	}

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
			object-fit: contain;
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
