<template>
	<main class="sub-status">
		<div class="button-bar">
			<SubButton v-if="!egv.subscribed" />
			<SubButton :gift="true" />
		</div>

		<div class="sub-state-grid">
			<section v-if="egv.subscribed && egv.subscription" class="sub-state-progress">
				<h3>{{ t("store.sub.state_heading") }}</h3>

				<div>
					<!-- Show sub status -->
					<div v-if="badgesLoaded" selector="badge-progress">
						<AnnotatedBadge v-if="currentBadge" :badge="currentBadge" size="4em" />

						<div class="progress-bar-wrapper">
							<p class="progress-percentage">{{ (Math.min(1, nextBadgePercent) * 100).toFixed(0) }}%</p>
							<div selector="progress-bar" />
						</div>

						<AnnotatedBadge v-if="nextBadge" :badge="nextBadge" size="4em" />
					</div>

					<p v-if="nextBadgePercent >= 0.995 && nextBadge" selector="new-badge-soon">
						<BadgeComponent
							:logo="{ color: 'black' }"
							:background="{ color: 'white' }"
							:style="{ width: '1em' }"
						/>
						{{ t("store.sub.state_badge_progress_filled", [nextBadge.name]) }}
					</p>
					<p>
						<Icon icon="timer" />
						{{ t("store.sub.state_age", [egv.subscription.age], egv.subscription.age) }}
					</p>
					<p v-if="egv.subscription.renew" selector="renew-date">
						<Icon size="lg" icon="cake-slice" />
						{{ t("store.sub.state_anniversary", [daysRemaining], daysRemaining) }}
					</p>
					<span v-else selector="renew-date">
						<Icon size="lg" icon="clock" />
						{{ t("store.sub.state_ending", [daysRemaining], daysRemaining) }}
					</span>

					<span v-if="egv.gifter">
						<Icon size="lg" icon="gift" :style="{ marginRight: '0.25em' }" />

						<i18n-t keypath="store.sub.state_gift">
							<template #USER>
								<UserTag :user="egv.gifter" scale="1em" />
							</template>
						</i18n-t>
					</span>

					<div class="sub-management">
						<a class="update-payment-link unstyled-link" @click="doUpdatePayment">
							{{ t("store.sub.update_payment") }}
						</a>
						<a v-if="egv.subscription.renew" class="cancel-link unstyled-link" @click="doCancel">
							{{ t("store.sub.cancel") }}
						</a>
						<a
							v-else-if="egv.subscription.subscription.customer_id === actor.id"
							class="reactivate-link unstyled-link"
							@click="doReactivate"
						>
							{{ t("store.sub.reactivate") }}
						</a>
					</div>
				</div>
			</section>

			<section class="sub-state-collection">
				<h3>{{ t("store.sub.state_collection_heading") }}</h3>
				<!-- Show sub item collection -->
				<div>
					<h3>{{ t("store.sub.state_badge_heading") }}</h3>
					<div class="badge-list">
						<AnnotatedBadge
							v-for="badge of subBadges"
							:key="badge.id"
							:badge="badge"
							size="3em"
							:locked="!obtained.includes(badge.id)"
						/>
					</div>

					<RouterLink v-if="actor.id" :to="{ name: 'UserSettings', params: { user: actor.id } }">
						<Button
							v-if="userBadges.length"
							:label="t('store.sub.state_badge_edit_button')"
							appearance="outline"
							color="primary"
					/></RouterLink>
				</div>
			</section>

			<section class="sub-state-paints">
				<h3>{{ t("store.sub.state_paints") }}</h3>

				<div v-if="userPaints.length" class="paint-progress">
					<h3>{{ t("store.sub.state_paints_heading", [userPaints.length], userPaints.length) }}</h3>

					<RouterLink :to="{ name: 'UserSettings', params: { user: actor.id } }">
						<Button :label="t('store.sub.state_paints_edit_button')" appearance="outline" color="primary" />
					</RouterLink>
				</div>

				<div>
					<h3>{{ t("store.sub.state_paints_current") }}</h3>
					<p>{{ t("store.sub.state_paints_hint") }}</p>

					<div class="paint-list">
						<PaintComponent v-for="paint of currentPaints" :key="paint.id" :text="true" :paint="paint">
							<span>{{ paint.name }}</span>
						</PaintComponent>
					</div>
				</div>
			</section>

			<section class="sub-state-raffle">
				<h3>{{ t("store.sub.state_raffle") }}</h3>
				<div class="emote-raffle-info">
					<p>We're working out the details for the sub raffle, more info soon!</p>
					<!-- <SubRaffle /> -->
				</div>
			</section>
			<section class="sub-state-leaderboards">
				<h3>{{ t("store.sub.state_leaderboards") }}</h3>
				<div>
					<p>Top Gifters are currently unavailable</p>
					<!-- <SubLeaderboards /> -->
				</div>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import { GetUserCosmetics } from "@/apollo/query/user-self.query";
import { GetUser } from "@/apollo/query/user.query";
import { Badge, Paint } from "@/structures/Cosmetic";
import SubCancelPromptModal from "@/views/store/SubCancelPromptModal.vue";
import BadgeComponent from "@/components/base/Badge.vue";
import { BadgeDef, badgeDefs, getNextBadge } from "@/components/utility/BadgeDefs";
import Button from "@/components/utility/Button.vue";
import Icon from "@/components/utility/Icon.vue";
import UserTag from "@/components/utility/UserTag.vue";
import AnnotatedBadge from "./AnnotatedBadge.vue";
import SubButton from "./SubButton.vue";
import { useEgVault } from "./egvault";
import differenceInDays from "date-fns/fp/differenceInDays";

const PaintComponent = defineAsyncComponent(() => import("@/components/utility/Paint.vue"));

const { t } = useI18n();

const egv = useEgVault();

// Fetch products
await egv.fetchProducts();

const daysRemaining = computed(() => differenceInDays(Date.now())(new Date(egv.subEndDate)));

const subBadges = badgeDefs.filter((b) => b.sub);

const nextBadgePercent = ref(0);
const barProgress = computed(() => nextBadgePercent.value * 100 + "%");

const currentBadge = ref<BadgeDef | null>(null);
const nextBadge = ref<BadgeDef | null>(null);

// Fetch user's owned cosmetics
const actor = useActor();
const { refetch, onResult } = useQuery<GetUser>(
	GetUserCosmetics,
	{ id: actor.id },
	{ fetchPolicy: "standby", debounce: 500 },
);

const userBadges = ref<Badge[]>([]);
const userPaints = ref<Paint[]>([]);
const obtained = computed(() => userBadges.value.map((b) => b.tag));

const badgesLoaded = ref(false);
onResult(async (res) => {
	if (!res.data || !res.data.user) {
		return;
	}

	const s = new Set(res.data.user.cosmetics.map((c) => c.id));
	const data = await actor.fetchCosmeticData(res.data.user.cosmetics.map((cos) => cos.id));

	userBadges.value = [];
	userPaints.value = [];

	for (const b of data?.cosmetics.badges ?? []) {
		if (!s.has(b.id)) {
			continue;
		}

		const badge = { ...b };

		userBadges.value.push(badge);
	}

	for (const p of data?.cosmetics.paints ?? []) {
		userPaints.value.push(p);
	}

	const subBadgeTags = subBadges.map((b) => b.id);

	const userSubBadges = userBadges.value
		.filter((b) => subBadgeTags.includes(b.tag))
		.reduce((acc, b) => {
			acc[b.tag] = b;
			return acc;
		}, {} as Record<string, Badge>);

	currentBadge.value =
		subBadges.toReversed().find((b) => {
			if (userSubBadges[b.id]) {
				return true;
			}
			return false;
		}) ?? subBadges[0];

	nextBadge.value = getNextBadge(currentBadge.value.id, true);

	const subAge = egv.subscription?.age ?? 0;
	const nextBadgeAge = nextBadge.value?.days ?? 0;
	const currentBadgeAge = currentBadge.value?.days ?? 0;

	// Calculate percentage progress starting from the current badge
	nextBadgePercent.value = (subAge - currentBadgeAge) / (nextBadgeAge - currentBadgeAge);

	badgesLoaded.value = true;
});

const updateSubData = () => {
	egv.fetchSub();
	refetch({ id: actor.id });
};

const currentPaints = ref([] as Paint[]);
actor.fetchCosmeticData(egv.subProduct?.current_paints ?? []).then((data) => {
	currentPaints.value = data?.cosmetics.paints ?? [];
});

watch(
	actor,
	(u) => {
		if (!u.id) {
			return;
		}

		updateSubData();
	},
	{ immediate: true },
);

const modal = useModal();

const doCancel = async () => {
	modal.open("sub-cancel", {
		component: SubCancelPromptModal,
		events: {
			confirm: async () => {
				await egv.cancelSub().then(updateSubData);
				egv.fetchSub();
				refetch({ id: actor.id });
			},
		},
		props: {},
	});
};

const doReactivate = async () => {
	await egv.reactivateSub().then(updateSubData);
};

const doUpdatePayment = async () => {
	const res = await egv.updatePayment();
	if (!res.ok) {
		return;
	}

	const data = await res.json();

	window.open(data.url, "_blank");
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.sub-status {
	width: 100%;
	display: flex;
	flex-direction: column;

	@include themify() {
		background-color: themed("navBackgroundColor");
		> .button-bar {
			background-color: mix(themed("backgroundColor"), themed("color"), 97.5%);
		}

		.sub-state-grid > section > div {
			background-color: lighten(themed("backgroundColor"), 2%);
		}

		> .sub-state-grid {
			border-color: darken(themed("navBackgroundColor"), 1%);
		}

		.sub-state-grid > section > h3 {
			background-color: opacify(darken(themed("navBackgroundColor"), 1%), 1);
		}

		section.sub-state-paints > div > div.paint-list {
			span {
				background-color: darken(themed("backgroundColor"), 5%);
			}
		}
	}

	.button-bar {
		z-index: 1;
		display: flex;
		justify-content: space-around;
	}

	> .sub-state-grid {
		display: flex;
		flex-wrap: wrap;
		border: 1em solid;
		border-top: none;

		> section {
			grid-area: section;
			display: flex;
			flex-direction: column;
			align-items: center;

			> div {
				border-radius: 0.25em;
				padding: 0.5em;
				line-height: 1.5em;
				font-weight: 500;
			}
		}
		> section > h3 {
			font-size: 1.5em;
			text-align: center;
			padding: 0.5em;
			letter-spacing: 0.1em;
			font-weight: 400;
			width: 100%;
		}

		> section.sub-state-progress {
			width: 100%;

			> div {
				padding: 1em;
				text-align: center;
				width: 100%;

				div[selector="badge-progress"] {
					display: flex;
					justify-content: space-between;
					align-items: center;

					> div.progress-bar-wrapper {
						width: 80%;
						margin-bottom: 2.5em;

						> [selector="progress-bar"] {
							height: 0.5em;
							border-radius: 0.25em;
							background-image: linear-gradient(
								90deg,
								rgb(255, 170, 0) v-bind(barProgress),
								rgb(124, 124, 124) v-bind(barProgress)
							);
						}

						> h3.progress-percentage {
							font-size: 1.15em;
							margin-bottom: 0.25em;
						}
					}
				}

				> [selector="new-badge-soon"] {
					color: lime;
				}

				> div.sub-management {
					margin-top: 0.5em;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					row-gap: 0.5em;

					> a {
						text-align: center;
						cursor: pointer;
						width: fit-content;
					}

					> .cancel-link {
						color: rgb(255, 60, 60);
					}
					> .update-payment-link {
						color: rgb(20, 150, 190);
					}
					> .reactivate-link {
						color: rgb(60, 150, 150);
					}
				}
			}
		}

		> section.sub-state-collection {
			width: 100%;

			> div {
				width: 100%;

				> div.badge-list {
					margin-top: 0.5em;
					display: flex;
					flex-wrap: wrap;
					gap: 0.85em;
					margin-bottom: 1em;
				}
			}
		}

		> section.sub-state-paints {
			width: 100%;

			> div {
				padding: 1em;
				width: 100%;

				> h3 {
					font-size: 1.185em;
					margin-bottom: 0.5em;
				}

				> p {
					margin-bottom: 0.5em;
				}

				> div.paint-list {
					display: flex;
					column-gap: 0.5em;
					font-size: 1.5em;

					span {
						padding: 0.25em;
						border-radius: 0.25em;
					}
				}
			}
		}

		> section.sub-state-raffle {
			width: 50%;

			> div {
				padding: 3em;
				width: 100%;
				height: 100%;
				border-radius: 0;
				text-align: center;
			}

			@media screen and (max-width: 800px) {
				width: 100%;
			}
		}

		> section.sub-state-leaderboards {
			width: 50%;

			> div {
				padding: 3em;
				width: 100%;
				height: 100%;
				border-radius: 0;
				text-align: center;
			}

			@media screen and (max-width: 800px) {
				width: 100%;
			}
		}
	}
}
</style>
