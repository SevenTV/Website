<template>
	<template v-if="emote?.id">
		<div v-if="emote" ref="emoteCard" class="emote-card" tabindex="0" :style="{ filter: borderFilter }">
			<router-link
				v-wave="{ duration: 0.2 }"
				:to="{ name: 'Emote', params: { emoteID: emote.id, emoteData: JSON.stringify(emote) } }"
				class="unstyled-link"
				:loading="!imageURL"
				@contextmenu="openContext"
			>
				<div class="img-wrapper">
					<img v-if="!isUnavailable" :src="imageURL" />
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
	</template>
	<template v-else>
		<div class="emote-card">
			<a :loading="true" />
		</div>
	</template>
</template>

<script setup lang="ts">
import { Emote } from "@/structures/Emote";
import { computed, inject, onMounted, PropType, ref, watch } from "vue";
import { EmoteSet } from "@/structures/EmoteSet";
import { useStore } from "@/store/main";
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import { Common } from "@/structures/Common";
import type { ContextMenuFunction } from "@/App.vue";
import UserTag from "@components/utility/UserTag.vue";
import Tooltip from "@components/utility/Tooltip.vue";
import EmoteCardContext from "@components/utility/EmoteCardContext.vue";

const props = defineProps({
	emote: {
		type: Object as PropType<Emote>,
		required: true,
	},
	alias: {
		type: String,
		required: false,
	},
});

const store = useStore();
const globalEmoteSet = computed(() => store.globalEmoteSet as EmoteSet);
const borderFilter = computed(() =>
	indicators.value.map(({ color }) => `drop-shadow(0.03em 0.03em 0.075em ${color})`).join(" "),
);
const { activeEmotes, defaultEmoteSet } = storeToRefs(useActorStore());
const hasEmote = computed(() => activeEmotes.value.has(props.emote?.id as string));

const indicators = computed(() => {
	let list = [] as Indicator[];
	if (hasEmote.value) {
		list.push({
			icon: "check",
			tooltip: `Added to ${defaultEmoteSet.value?.name}`,
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

const emoteCard = ref<HTMLDivElement>();
onMounted(() => {
	const el = emoteCard.value;
	if (!el || indicators.value.length === 0) {
		return;
	}
});

const ctxMenuUtil = inject<ContextMenuFunction>("ContextMenu", () => null);
const openContext = (ev: MouseEvent) => {
	ctxMenuUtil(ev, EmoteCardContext, { emoteID: props.emote.id });
};

const imageURL = ref("");
const emote = computed(() => props.emote);
let img: HTMLImageElement | null;
watch(
	emote,
	(e) => {
		imageURL.value = "";
		if (img) {
			img.src = "";
		}
		img = new Image();
		img.onload = () => {
			imageURL.value = (img as HTMLImageElement).src as string;
		};
		img.src = Emote.GetImage(e.images, Common.Image.Format.WEBP, "3x")?.url as string;
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
@import "@scss/components/emote-card.scss";
</style>
