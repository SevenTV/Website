<template>
	<main class="sub-status">
		<div class="button-bar">
			<SubButton v-if="!egv.subscribed" />
		</div>

		<div class="sub-state-grid">
			<section v-if="egv.subscribed" class="sub-state-progress">
				<h3>{{ egv.subscribed ? t("store.sub.state_heading") : t("store.sub.state_badge_progress") }}</h3>

				<div>
					<!-- Show sub status -->
					<div v selector="badge-progress">
						<AnnotatedBadge v-if="currentBadge" :badge="currentBadge" size="4em" />

						<div selector="progress-bar" />

						<AnnotatedBadge v-if="nextBadge" :badge="nextBadge" size="4em" />
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

				<div>
					<p>{{ t("store.sub.state_paints_heading", [userPaints.length]) }}</p>

					<div class="paint-list">
						<PaintComponent v-for="paint of userPaints" :key="paint.id" :text="true" :paint="paint">
							<span> {{ paint.name }} </span>
						</PaintComponent>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault";
import { badgeDefs, getNextBadge, getNearestBadgeByAge, BadgeDef } from "@/components/utility/BadgeDefs";
import { useQuery } from "@vue/apollo-composable";
import { GetUserCosmetics } from "@/assets/gql/users/self";
import { useActorStore } from "@/store/actor";
import { GetUser } from "@/assets/gql/users/user";
import { Badge, Paint } from "@structures/Cosmetic";
import differenceInDays from "date-fns/fp/differenceInDays";
import SubButton from "./SubButton.vue";
import AnnotatedBadge from "./AnnotatedBadge.vue";
import PaintComponent from "@/components/utility/Paint.vue";

const { t } = useI18n();

const egv = useEgVault();

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

onResult(async (res) => {
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

	currentBadge.value = getNearestBadgeByAge(egv.subscription?.age ?? 0) ?? subBadges[0];
	nextBadge.value = getNextBadge(currentBadge.value.id);

	const nextBadgeAge = nextBadge.value?.days ?? 0;
	const subAge = egv.subscription?.age ?? 0;

	nextBadgePercent.value = subAge / nextBadgeAge;
});

watch(
	actor,
	(u) => {
		if (!u.id) {
			return;
		}

		refetch({ id: actor.id });
		egv.fetchSub();
	},
	{ immediate: true },
);
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
				display: flex;
				flex-wrap: wrap;
				gap: 0.85em;
			}
		}

		> section.sub-state-paints {
			> div {
				width: 80%;

				> p {
					font-size: 1.185em;
					margin-bottom: 0.5em;
				}

				> div.paint-list {
					padding: 0.25em;
					font-size: 1.25em;
				}
			}
		}
	}
}
</style>
