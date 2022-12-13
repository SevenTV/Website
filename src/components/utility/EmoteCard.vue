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
			<div class="img-wrapper" :censor="!emote.listed && !actor.hasPermission(Permissions.EditAnyEmote)">
				<img v-if="src" :src="src" />
			</div>
			<div class="img-gap" />
			<div class="title-banner">
				<span>{{ alias || emote.name }}</span>
			</div>
			<div v-if="emote.owner" class="title-banner submitter">
				<UserTag :user="emote.owner" :hide-avatar="true" :cosmetics="true"></UserTag>
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
					<img
						v-tooltip="t('emote_set.label_actor', [emoteActor.display_name])"
						v-tooltip:position="'right-end'"
						:src="emoteActor.avatar_url"
						class="emote-actor"
					/>
				</div>

				<TransitionGroup name="fade">
					<div v-for="ind of indicators" :key="ind.icon" class="state-indicator">
						<div v-tooltip="ind.tooltip" v-tooltip:position="'right-end'">
							<div class="icon" :style="{ color: ind.color }">
								<Icon :icon="ind.icon" />
							</div>
						</div>
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
import { Emote } from "@/structures/Emote";
import { computed, defineAsyncComponent, ref } from "vue";
import { useActor } from "@store/actor";
import { useI18n } from "vue-i18n";
import { Permissions } from "@/structures/Role";
import { useModal } from "@/store/modal";
import { useContextMenu } from "@/composables/useContextMenu";
import { getImage } from "@/structures/Common";
import { useMutationStore } from "@/store/mutation";
import { User } from "@/structures/User";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteCardContext from "@/components/utility/EmoteCardContext.vue";
import Icon from "./Icon.vue";

const SelectEmoteSet = defineAsyncComponent(() => import("@/components/modal/SelectEmoteSet/SelectEmoteSet.vue"));

const props = withDefaults(
	defineProps<{
		emote: Emote;
		emoteActor?: User;
		origin?: string | null;
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

const { namedSets } = storeToRefs(useStore());
const actor = useActor();
const ae = computed(() => actor.activeEmotes.get(props.emote?.id as string));

const indicators = computed(() => {
	let list = [] as Indicator[];

	if (ae.value) {
		const isForeign = ae.value.origin_id;
		const setName = actor.defaultEmoteSet?.name ?? "";

		list.push({
			icon: "check",
			tooltip: isForeign
				? t("emote.card_label_added_foreign", [setName])
				: t("emote.card_label_added", [setName]),
			color: isForeign ? "#4d66b3" : "#9146ff",
		});
	}
	if (props.emote.listed === false) {
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
	if (props.emote.trending) {
		list.push({
			icon: "fire",
			tooltip: t("emote.trending_rank", [props.emote.trending]),
			color: "#ff9632",
		});
	}
	if (props.origin) {
		list.push({
			icon: "sync",
			tooltip: t("emote_set.label_synced", [props.origin]),
			color: "#4d66b3",
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

const { open: openContextMenu } = useContextMenu();
const openContext = (ev: MouseEvent) => {
	openContextMenu(ev, EmoteCardContext, { emote: props.emote }).then((v) => {
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

const src = computed(() => (props.unload ? "" : (getImage(props.emote.host, actor.preferredFormat, 2)?.url as string)));

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
		border: 1px solid white;
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
