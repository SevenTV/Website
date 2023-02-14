<template>
	<div class="emote-set-card" :personal="HasBits(set.flags, EmoteSetFlag.PERSONAL)">
		<div>
			<router-link
				class="unstyled-link"
				selector="card-content"
				:to="{ name: 'EmoteSet', params: { setID: set.id } }"
				@contextmenu.prevent="openContext"
			>
				<p selector="title">
					<span selector="set-name">{{ set.name || "..." }}</span>
					<span v-if="!hideOwner && set.owner" selector="set-author">
						<UserTag :user="set.owner" scale="0.88rem" text-scale="0.88rem" />
					</span>
				</p>
				<div selector="emotes">
					<div v-for="emote in emotes" :key="emote.id" class="feature-emote">
						<img
							v-if="typeof emote.id === 'string'"
							v-tooltip="emote.name"
							class="emote-img"
							:src="imageData(emote)"
							loading="lazy"
						/>
						<Icon v-else class="emote-img" icon="square" />
					</div>
				</div>
				<div v-if="set.emotes" selector="stats">
					<span />
					<span selector="set-capacity" class="use-quota">
						<span v-if="quota.enabled">{{ usage }}%</span>
						<span v-else>{{ set.emote_count }} / {{ set.capacity }}</span>
					</span>
					<!-- Quick Options -->
					<div v-if="mayEditSet" selector="quick-options" @click.prevent="openContext">
						<Icon icon="wrench" />
					</div>
					<span v-else />
				</div>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, toRef, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import { GetEmoteSet, GetEmoteSetForCard } from "@/apollo/query/emote-set.query";
import { getImage } from "@/structures/Common";
import { ActiveEmote, EmoteSet, EmoteSetFlag } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";
import Icon from "@/components/utility/Icon.vue";
import UserTag from "@/components/utility/UserTag.vue";

const EmoteSetPropertiesModal = defineAsyncComponent(() => import("@/views/emote-set/EmoteSetPropertiesModal.vue"));

const props = defineProps<{
	set: EmoteSet;
	hideOwner?: boolean;
}>();

const set = toRef(props, "set");
const { hasEditorPermission } = useActor();
const { preferredFormat } = storeToRefs(useActor());

const emotes = ref<ActiveEmote[]>([]);

// actor permission
const mayEditSet = computed(
	() => set.value?.owner && hasEditorPermission(set.value.owner, User.EditorPermission.ManageEmoteSets),
);

// fetch full set data
const { onResult, refetch } = useQuery<GetEmoteSet>(GetEmoteSetForCard, () => ({
	id: set.value.id,
	limit: 20,
}));
onResult((res) => {
	set.value.emotes = res.data.emoteSet.emotes;
	set.value.emote_count = res.data.emoteSet.emote_count;
});

// quota (experimental)
const quota = reactive({
	enabled: false,
});

const usage = computed(() =>
	Array.isArray(set.value.emotes)
		? quota.enabled
			? 0
			: ((set.value.emote_count / set.value.capacity) * 100).toFixed(1)
		: 0,
);
const quotaUsageStyle = computed(() => `${usage.value}%`);

// context menu
const modal = useModal();
const openContext = () => {
	if (!mayEditSet.value) return;

	modal.open("emote-set", {
		component: EmoteSetPropertiesModal,
		props: { set: set.value },
		events: {
			update: () => refetch(),
		},
	});
};

function imageData(ae: ActiveEmote) {
	if (!ae.data) {
		return "";
	}

	return getImage(ae.data.host, preferredFormat.value, 1).url ?? "";
}

watchEffect(() => {
	if (!Array.isArray(set.value.emotes)) return [];
	const ary = Array(0);
	for (let i = 0; i < Math.min(set.value.capacity, 20); i++) {
		ary[i] = set.value.emotes[i] ?? { id: i + 1 };
	}

	emotes.value = ary;
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-set-card {
	@include themify() {
		--capacity-fill-color: #{mix(themed("color"), themed("extreme"), 30%)};
	}

	&[personal="true"] {
		filter: drop-shadow(0.01em 0.01em 0.075em $subColor);

		--capacity-fill-color: #{$subColor};
	}

	> div {
		width: 24em;
		height: 12em;
		border-radius: 0.35em;
		overflow: hidden;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1em), calc(100% - 1em) 100%, 1em 100%, 0 calc(100% - 1em));

		@include themify() {
			background-color: darken(themed("backgroundColor"), 3);

			p[selector="title"] {
				> span[selector="set-name"] {
					background-color: themed("backgroundColor");
				}
			}

			div[selector="stats"] {
				> span[selector="set-capacity"] {
					background-color: themed("backgroundColor");
				}
			}

			&:hover {
				background-color: darken(themed("backgroundColor"), 4);
			}
		}

		&:hover {
			cursor: pointer;
		}

		[selector="card-content"] {
			display: flex;
			flex-direction: column;
			gap: 1em;
			width: 100%;
			height: 100%;

			> p[selector="title"] {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: nowrap;

				> span[selector="set-name"] {
					display: block;
					width: 60%;
					font-size: 1.175em;
					font-weight: 200;
					padding: 0.25em 0.5em;
					padding-right: 1.5em;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					clip-path: polygon(0 0, 100% 0%, calc(100% - 1.5em) 100%, 0% 100%);
				}
				> span[selector="set-author"] {
					padding: 0.33em 0.5em;
				}
			}

			> div[selector="emotes"] {
				height: 8em;
				display: grid;
				align-items: center;
				justify-content: center;
				justify-items: center;
				grid-template-columns: repeat(10, 1.5em);

				.feature-emote:hover {
					z-index: 1;
				}

				// start of line 1
				.feature-emote:first-child > img {
					clip-path: polygon(0% 0, 100% 0%, 55% 100%, 0% 100%);
				}
				// end of line 1
				.feature-emote:nth-child(10) > img {
					clip-path: polygon(45% 0, 100% 0%, 100% 100%, 0% 100%);
				}
				// start of line 2
				.feature-emote:nth-child(11) > img {
					clip-path: polygon(0% 0, 100% 0%, 55% 100%, 0% 100%);
				}
				// end of line 2
				.feature-emote:last-child > img {
					clip-path: polygon(45% 0, 100% 0%, 100% 100%, 0% 100%);
				}
				.feature-emote > img {
					width: 2.5em;
					height: 2.5em;
					object-fit: cover;

					transition: all 170ms ease-in-out;
					clip-path: polygon(45% 0, 100% 0%, 55% 100%, 0% 100%);

					&:hover {
						transform: scale(1.1);
						clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
						background-color: rgba(0, 0, 0, 50%);
						border-radius: 0.25em;
						object-fit: contain;
					}
				}

				svg.emote-img {
					font-size: 0.25em;
				}
			}

			div[selector="stats"] {
				display: flex;
				justify-content: space-between;

				> span[selector="set-capacity"] {
					font-size: 0.88rem;
					padding: 0.2em 1em;
					width: 75%;
					text-align: center;
					clip-path: polygon(0.5em 0%, calc(100% - 0.5em) 0%, 100% 100%, 0% 100%);
					font-weight: 600;

					$fillPercent: v-bind("quotaUsageStyle");
					@include themify() {
						background-image: linear-gradient(
							90deg,
							var(--capacity-fill-color) $fillPercent,
							transparent,
							$fillPercent,
							transparent 100%
						);

						> span:first-child {
							-webkit-text-stroke: 0.025em themed("extreme");
						}
					}
				}

				> div[selector="quick-options"] {
					transform: translate(-2em, -0.5em);
					width: 0;

					&:hover {
						filter: drop-shadow(0 0 0.25em currentColor);
					}
				}
			}
		}
	}
}
</style>
