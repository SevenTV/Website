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
							<p class="progress-percentage">{{ (nextBadgePercent * 100).toFixed(0) }}%</p>
							<div selector="progress-bar" />
						</div>

						<AnnotatedBadge v-if="nextBadge" :badge="nextBadge" size="4em" />
					</div>

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
					<p>Subscriber Badges</p>
					<div class="badge-list">
						<AnnotatedBadge
							v-for="badge of subBadges"
							:key="badge.id"
							:badge="badge"
							size="3em"
							:locked="!obtained.includes(badge.id)"
						/>
					</div>
				</div>
			</section>

			<section class="sub-state-paints">
				<h3>{{ t("store.sub.state_paints") }}</h3>

				<div v-if="userPaints.length">
					<p>{{ t("store.sub.state_paints_heading", [userPaints.length]) }}</p>

					<div class="paint-list">
						<PaintComponent v-for="paint of userPaints" :key="paint.id" :text="true" :paint="paint">
							<span> {{ paint.name }} </span>
						</PaintComponent>
					</div>
				</div>

				<div>
					<p>New Paints this month</p>

					<div class="paint-list">
						<PaintComponent v-for="paint of currentPaints" :key="paint.id" :text="true" :paint="paint">
							<span>{{ paint.name }}</span>
						</PaintComponent>
					</div>
				</div>
			</section>

			<section class="sub-state-raffle">
				<div class="emote-raffle-info">
					<SubRaffle />
				</div>
			</section>
			<section class="sub-state-leaderboards">
				<div>
					<SubLeaderboards />
				</div>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault";
import { badgeDefs, getNextBadge, BadgeDef, getBadgeByID } from "@/components/utility/BadgeDefs";
import { useQuery } from "@vue/apollo-composable";
import { GetUserCosmetics } from "@/assets/gql/users/self";
import { useActorStore } from "@/store/actor";
import { GetUser } from "@/assets/gql/users/user";
import { Badge, Paint } from "@structures/Cosmetic";
import { useModal } from "@/store/modal";
import differenceInDays from "date-fns/fp/differenceInDays";
import SubButton from "./SubButton.vue";
import AnnotatedBadge from "./AnnotatedBadge.vue";
import PaintComponent from "@/components/utility/Paint.vue";
import SubCancelPromptModal from "@/views/Store/SubCancelPromptModal.vue";
import SubRaffle from "./SubRaffle.vue";
import SubLeaderboards from "./SubLeaderboards.vue";
import Icon from "@/components/utility/Icon.vue";

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
const actor = useActorStore();
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

	currentBadge.value = getBadgeByID(userBadges.value[userBadges.value.length - 1]?.tag) ?? subBadges[0];
	nextBadge.value = getNextBadge(currentBadge.value.id);

	const nextBadgeAge = nextBadge.value?.days ?? 0;
	const subAge = egv.subscription?.age ?? 0;

	nextBadgePercent.value = subAge / nextBadgeAge;

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
		> .button-bar {
			background-color: mix(themed("backgroundColor"), themed("color"), 97.5);
		}

		.sub-state-grid > section > div {
			background-color: lighten(themed("backgroundColor"), 2);
		}
		.sub-state-grid > section > h3 {
			background-color: darken(themed("navBackgroundColor"), 1);
		}
	}

	.button-bar {
		display: flex;
		justify-content: space-around;
	}

	> .sub-state-grid {
		margin: 1em;
		display: flex;
		flex-wrap: wrap;

		> section {
			grid-area: section;
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
			padding: 0.5em;
			letter-spacing: 0.1em;
			font-weight: 400;
			width: 80%;
		}

		> section.sub-state-progress {
			width: 100%;

			> div {
				padding: 1em;
				text-align: center;
				width: 80%;

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

						> p.progress-percentage {
							font-size: 1.15em;
							margin-bottom: 0.25em;
						}
					}
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
				padding: 1em;
				width: 80%;

				> p {
					font-size: 1.185em;
					margin-bottom: 1em;
				}

				> div.badge-list {
					display: flex;
					flex-wrap: wrap;
					gap: 0.85em;
				}
			}
		}

		> section.sub-state-paints {
			width: 100%;

			> h3 {
				width: 80%;
			}

			> div {
				width: 80%;

				> p {
					font-size: 1.185em;
					margin-bottom: 0.5em;
				}

				> div.paint-list {
					padding: 0.25em;
					font-size: 1.25em;
					display: grid;
					grid-template-columns: repeat(auto-fit, 8em);
				}
			}
		}

		> section.sub-state-raffle {
			width: 50%;

			@media screen and (max-width: 800px) {
				width: 100%;
			}
		}

		> section.sub-state-leaderboards {
			width: 50%;

			@media screen and (max-width: 800px) {
				width: 100%;
			}
		}
	}
}
</style>
