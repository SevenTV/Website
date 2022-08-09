<template>
	<main class="sub-status">
		<div class="button-bar">
			<SubButton v-if="!egv.subscribed" />
		</div>

		<div class="sub-state-grid">
			<section class="sub-state-progress">
				<h3>{{ egv.subscribed ? t("store.sub.state_heading") : t("store.sub.state_badge_progress") }}</h3>

				<div>
					<!-- Show sub status -->
					<div selector="badge-progress">
						<Badge
							v-if="currentBadge"
							:logo="currentBadge.logo"
							:border="currentBadge.border"
							:background="currentBadge.background"
						/>

						<div selector="progress-bar" />
						<Badge
							v-if="nextBadge"
							:logo="nextBadge.logo"
							:border="nextBadge.border"
							:background="nextBadge.background"
						/>
					</div>

					<span selector="renew-date">
						<font-awesome-icon size="lg" :icon="['far', 'cake-slice']" />
						{{ t("store.sub.state_anniversary", [daysRemaining]) }}
					</span>
				</div>
			</section>

			<section class="sub-state-collection">
				<h3>{{ t("store.sub.state_collection_heading") }}</h3>
				<!-- Show sub item collection -->
				<div>
					<p>Subscriber Badges</p>
					<div class="badge-list">
						<span
							v-for="baj of subBadges"
							:key="baj.id"
							:class="{ unlocked: baj.id === 'sub' }"
							class="badge-item"
						>
							<span class="badge-lock">
								<font-awesome-icon :icon="['far', 'lock']" />
							</span>
							<Badge :logo="baj.logo" :border="baj.border" :background="baj.background" />
							<p>{{ baj.name }}</p>
						</span>
					</div>
				</div>
			</section>

			<section class="sub-state-paints">
				<h3>{{ t("store.sub.state_paints") }}</h3>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault";
import { badgeDefs, getBadgeByID } from "@/components/utility/BadgeDefs";
import differenceInDays from "date-fns/fp/differenceInDays";
import SubButton from "./SubButton.vue";
import Badge from "@/components/base/Badge.vue";

const { t } = useI18n();

const egv = useEgVault();

const daysRemaining = computed(() => differenceInDays(Date.now())(new Date(egv.subEndDate)));

const subBadges = badgeDefs.filter((b) => b.sub);

const nextBadgePercent = 0.7;
const barProgress = computed(() => nextBadgePercent * 100 + "%");

const currentBadge = getBadgeByID("sub1");
const nextBadge = getBadgeByID("sub2");
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.sub-status {
	width: 100%;
	display: flex;
	flex-direction: column;

	@include themify() {
		> .button-bar {
			background-color: mix(themed("backgroundColor"), themed("color"), 97.5);
		}

		.sub-state-grid > section > div {
			background-color: lighten(themed("backgroundColor"), 2);
		}
	}

	.button-bar {
		display: flex;
		justify-content: space-around;
	}

	> .sub-state-grid {
		margin: 1em;
		display: grid;
		grid-template-columns: auto;

		> section {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 1.5em;

			> div {
				border-radius: 0.25em;
				padding: 0.5em;
			}
		}
		> section > h3 {
			letter-spacing: 0.1em;
			font-weight: 400;
			margin-bottom: 1em;
		}

		> section.sub-state-progress > div {
			padding: 1em;
			text-align: center;
			width: 80%;

			div[selector="badge-progress"] {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 4em;

				> [selector="progress-bar"] {
					height: 0.1em;
					border-radius: 0.25em;
					width: 80%;
					background-image: linear-gradient(
						90deg,
						rgb(255, 170, 0) v-bind(barProgress),
						rgb(124, 124, 124) v-bind(barProgress)
					);
				}
			}

			span[selector="renew-date"] {
				width: 100%;
			}
		}

		> section.sub-state-collection > div {
			padding: 1em;
			width: 80%;

			> p {
				font-size: 1.185em;
				margin-bottom: 1em;
			}

			> div.badge-list {
				$badgeSize: 3em;

				display: flex;
				flex-wrap: wrap;
				gap: 0.5em;
				font-size: $badgeSize;
				margin-left: 0.25em;

				> .badge-item {
					text-align: center;

					span.badge-lock {
						position: absolute;
						color: rgb(255, 70, 70);
						border-radius: 0.25em;
						margin-left: calc($badgeSize - 1em);
						font-size: 1rem;
					}
				}

				> .badge-item > p {
					font-size: 0.75rem;
					text-align: center;
				}

				> .badge-item:not(.unlocked) {
					> svg {
						opacity: 0.5;
					}
				}
			}
		}
	}
}
</style>
