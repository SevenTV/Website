<template>
	<transition name="card" mode="out-in" appear>
		<div v-if="emote" ref="emoteCard" class="emote-card" tabindex="0" :style="{ filter: borderFilter }">
			<router-link
				v-wave="{ duration: 0.2 }"
				:to="{ name: 'Emote', params: { emoteID: emote.id, emoteData: JSON.stringify(emote) } }"
				class="unstyled-link"
				@contextmenu="openContext"
			>
				<div class="img-wrapper">
					<img v-if="!isUnavailable" :src="imageURL ?? 'unknown'" />
					<img v-else src="@/assets/img/question.webp" />
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
					<div v-for="ind of indicators" :key="ind.icon" class="state-indicator">
						<Tooltip :text="ind.tooltip" position="top" :offset="[90, 0]">
							<div>
								<div class="icon" :style="{ color: ind.color }">
									<font-awesome-icon :icon="['fas', ind.icon]" />
								</div>
							</div>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Emote } from "@/structures/Emote";
import { computed, defineComponent, inject, onMounted, PropType, ref } from "vue";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { EmoteSet } from "@/structures/EmoteSet";
import { useStore } from "@/store/main";
import { useActorStore } from "@/store/actor";
import { Common } from "@/structures/Common";
import type { ContextMenuFunction } from "@/App.vue";
import UserTag from "@components/utility/UserTag.vue";
import Tooltip from "@components/utility/Tooltip.vue";
import EmoteCardContext from "@components/utility/EmoteCardContext.vue";

export default defineComponent({
	components: {
		Tooltip,
		UserTag,
	},
	props: {
		emote: {
			type: Object as PropType<Emote>,
			required: true,
		},
		alias: {
			type: String,
			required: false,
		},
	},

	setup(props) {
		const store = useStore();
		const actorStore = useActorStore();
		const globalEmoteSet = computed(() => store.globalEmoteSet as EmoteSet);
		const borderFilter = computed(() =>
			indicators.value.map(({ color }) => `drop-shadow(0.07em 0.07em 0.125em ${color})`).join(" ")
		);
		const actives = computed(() => actorStore.getActiveEmotes);
		const hasEmote = computed(() => actives.value.has(props.emote?.id as string));

		const indicators = computed(() => {
			let list = [] as Indicator[];
			if (hasEmote.value) {
				list.push({
					icon: "check",
					tooltip: "Channel Emote",
					color: "#9146ff",
				});
			}
			if (EmoteSet.HasEmote(globalEmoteSet.value, props.emote.id)) {
				list.push({
					icon: "star",
					tooltip: "Global Emote",
					color: "#b2ff59",
				});
			}
			if (Emote.IsUnlisted(props.emote)) {
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
			if (props.alias && props.alias !== props.emote.name) {
				list.push({
					icon: "tag",
					tooltip: "Renamed In Channel",
					color: "aquamarine",
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
			() => typeof props.emote.lifecycle === "number" && props.emote.lifecycle !== Emote.Lifecycle.LIVE
		);

		const emoteCard = ref<HTMLDivElement>();
		onMounted(() => {
			const el = emoteCard.value;
			if (!el || indicators.value.length === 0) {
				return;
			}

			el.style.setProperty("--emote-card-shadow-color", indicators.value[indicators.value.length - 1].color);
		});

		const ctxMenuUtil = inject<ContextMenuFunction>("ContextMenu", () => null);
		const openContext = (ev: MouseEvent) => {
			ctxMenuUtil(ev, EmoteCardContext, { emoteID: props.emote.id });
		};

		const imageURL = computed(() => Emote.GetUrl(props.emote, Common.Image.Format.WEBP, "3x"));
		return {
			indicators,
			isUnavailable,
			borderFilter,
			emoteCard,
			imageURL,
			GetUrl: Emote.GetUrl,
			ConvertIntColorToHex,
			openContext,
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
@import "@scss/components/emote-card.scss";
</style>
