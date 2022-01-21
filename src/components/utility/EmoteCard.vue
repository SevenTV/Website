<template>
	<transition name="card" mode="out-in" appear>
		<div class="emote-card" tabindex="0">
			<router-link
				:to="{ name: 'Emote', params: { emoteID: emote.id, emoteData: JSON.stringify(emote) } }"
				class="unstyled-link"
				@contextmenu="openContext"
			>
				<div class="title-banner">
					<span>{{ emote?.name }}</span>
				</div>

				<div class="title-banner submitter">
					<UserTag :user="emote?.owner" :hide-avatar="true"></UserTag>
				</div>

				<div class="img-wrapper">
					<img :src="GetUrl(emote, '3x') + '.webp' ?? 'unknown'" />
				</div>
			</router-link>

			<div v-if="indicator.icon" class="state-indicator">
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
import { Emote, GetUrl, IsGlobal } from "@/structures/Emote";
import { defineComponent, inject, PropType, ref } from "vue";
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
	},

	setup(props) {
		const store = useStore();
		const clientUser = store.state.clientUser as User;
		const indicator = ref({
			icon: "",
			color: "",
		} as Indicator);
		if (IsGlobal(props.emote)) {
			indicator.value.icon = "star";
			indicator.value.tooltip = "Global Emote";
			indicator.value.color = "#b2ff59";
		}
		if (UserHasEmote(clientUser, props.emote.id)) {
			indicator.value.icon = "check";
			indicator.value.tooltip = "Channel Emote";
			indicator.value.color = "#71f59d";
		}

		const ctxMenuUtil = inject<ContextMenuFunction>("ContextMenu", () => null);
		const openContext = (ev: MouseEvent) => {
			ctxMenuUtil(ev, EmoteCardContext, { emoteID: props.emote.id });
		};
		return {
			indicator,
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
