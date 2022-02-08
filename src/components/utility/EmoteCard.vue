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
					<img :src="GetUrl(emote, '3x') ?? 'unknown'" />
				</div>
				<div class="img-gap" />
				<div class="title-banner">
					<span>{{ alias || emote.name }}</span>
				</div>
				<div v-if="alias && emote.name !== alias" class="title-banner alias-og">
					<span>
						<span class="aka">aka</span>
						<span class="og-name"> {{ emote?.name }} </span>
					</span>
				</div>

				<div v-if="emote.owner" class="title-banner submitter">
					<UserTag :user="emote.owner" :hide-avatar="true"></UserTag>
				</div>
			</router-link>

			<div class="state-indicator-list">
				<div class="state-indicator-wrapper">
					<div v-for="ind of indicators" :key="ind.icon" class="state-indicator">
						<Tooltip :text="ind.tooltip" position="top">
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
import { Emote, GetUrl, IsGlobal, IsZeroWidth } from "@/structures/Emote";
import { computed, defineComponent, inject, onMounted, PropType, ref } from "vue";
import { ConvertIntColorToHex, User, UserHasEmote } from "@/structures/User";
import { useStore } from "@/store";
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
		const clientUser = store.state.clientUser as User;
		const indicators = ref([] as Indicator[]);
		const borderFilter = computed(() =>
			indicators.value.map(({ color }) => `drop-shadow(0.07em 0.07em 0.125em ${color})`).join(" ")
		);
		if (UserHasEmote(clientUser, props.emote.id)) {
			indicators.value.push({
				icon: "check",
				tooltip: "Channel Emote",
				color: "#9146ff",
			});
		}
		if (IsGlobal(props.emote)) {
			indicators.value.push({
				icon: "star",
				tooltip: "Global Emote",
				color: "#b2ff59",
			});
		}
		if (IsZeroWidth(props.emote)) {
			indicators.value.push({
				icon: "object-group",
				tooltip: "Zero-Width Emote",
				color: "goldenrod",
			});
		}

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
		return {
			indicators,
			borderFilter,
			emoteCard,
			GetUrl,
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
