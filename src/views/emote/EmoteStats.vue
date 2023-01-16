<template>
	<main class="emote-statistics">
		<div class="stats-separator"></div>

		<div selector="stats-area">
			<div selector="emote-common-names">
				<h2 class="block-heading">{{ t("emote.common_names") }}</h2>
				<div selector="items">
					<div v-for="n in names" :key="n.name" selector="name-count-item">
						<span selector="name"> {{ n.name }} </span>
						<span selector="count"> {{ n.count }} </span>
					</div>
				</div>
			</div>
			<div selector="stats">
				<h2 class="block-heading">{{ t("emote.usage_stats") }}</h2>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { GetEmote, GetEmoteStatistics } from "@/apollo/query/emote.query";

const props = defineProps<{
	emoteID: string;
}>();
const { t } = useI18n();
const { result } = useQuery<GetEmote>(GetEmoteStatistics, { id: props.emoteID });

const names = computed(() => result.value?.emote.common_names);
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.emote-statistics {
	@include themify() {
		> .stats-separator {
			background-color: darken(themed("backgroundColor"), 1);
		}

		> div[selector="stats-area"] {
			> div[selector="emote-common-names"] {
				background-color: lighten(themed("backgroundColor"), 2);

				> div > div {
					> span:nth-child(1) {
						background-color: darken(themed("backgroundColor"), 2);
					}
					> span:nth-child(2) {
						background-color: darken(themed("primary"), 30);
					}
				}
			}

			> div[selector="stats"] {
				background-color: lighten(themed("backgroundColor"), 1);
			}
		}
	}

	> .stats-separator {
		height: 3em;
	}

	> div[selector="stats-area"] {
		display: flex;
		flex-direction: row;
		min-height: 33vh;

		h2.block-heading {
			font-weight: 300;
			letter-spacing: 0.1rem;
			margin: 0.5em;
		}

		> div[selector="emote-common-names"] {
			width: 33.3333%;

			> div[selector="items"] {
				margin-left: 0.25em;

				> div[selector="name-count-item"] {
					font-size: 1.15em;
					margin: 1em;

					> span {
						padding: 0.4em;
					}
				}
			}
		}

		> div[selector="stats"] {
			width: 66.6666%;

			> h2 {
				text-align: end;
			}
		}

		@media screen and (max-width: 900px) {
			flex-direction: column !important;
			> div {
				width: 100% !important;
			}
		}
	}
}
</style>
