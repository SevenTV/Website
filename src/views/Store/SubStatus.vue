<template>
	<main class="sub-status">
		<div class="button-bar">
			<SubButton />
		</div>

		<div class="sub-state-grid">
			<section class="sub-state-progress">
				<h3>{{ egv.subscribed ? t("store.sub.state_heading") : t("store.sub.state_badge_progress") }}</h3>
				<!-- Show sub status -->
				<div>
					<div class="badge-list">
						<Badge
							v-for="baj of badgeDefs"
							:key="baj.id"
							:logo="baj.logo"
							:border="baj.border"
							:background="baj.background"
						/>
					</div>

					<span>{{ t("store.sub.state_anniversary", [daysRemaining]) }}</span>
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
import type { Component } from "vue";
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault";
import differenceInDays from "date-fns/fp/differenceInDays";
import SubButton from "./SubButton.vue";
import Badge, { GradientDef } from "@/components/base/Badge.vue";
import BgBadge1VueSvg from "@/components/base/BgBadge1.vue";
import BgBadge2VueSvg from "@/components/base/BgBadge2.vue";
import BgBadge3VueSvg from "@/components/base/BgBadge3.vue";
import BgBadge4VueSvg from "@/components/base/BgBadge4.vue";

const { t } = useI18n();

const egv = useEgVault();

const daysRemaining = computed(() => differenceInDays(Date.now())(new Date(egv.subEndDate)));

const badgeDefs = [
	{
		id: "1mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#fee029", offset: 0 },
					{ color: "#ff7f21", offset: 1 },
				],
			},
		},
	},
	{
		id: "2mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ffb400", offset: 0 },
					{ color: "#f0106d", offset: 1 },
				],
			},
		},
	},
	{
		id: "3mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ff256b", offset: 0 },
					{ color: "#a60a4b", offset: 1 },
				],
			},
		},
	},
	{
		id: "6mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#ff447c", offset: 0 },
					{ color: "#9704fd", offset: 1 },
				],
			},
		},
	},
	{
		id: "9mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#02e5f8", offset: 0 },
					{ color: "#664eee", offset: 1 },
				],
			},
		},
	},
	{
		id: "12mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			component: BgBadge1VueSvg,
		},
	},
	{
		id: "15mo",
		logo: { color: "#18181b" },
		border: { color: "transparent" },
		background: {
			component: BgBadge2VueSvg,
		},
	},
	{
		id: "18mo",
		logo: { color: "#ffffff" },
		border: { color: "transparent" },
		background: {
			component: BgBadge3VueSvg,
		},
	},
	{
		id: "21mo",
		logo: { color: "#ffffff" },
		border: { color: "transparent" },
		background: {
			component: BgBadge4VueSvg,
		},
	},
	{
		id: "subfounder",
		logo: { color: "#ffffff" },
		border: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#fee029", offset: 0 },
					{ color: "#ff7f21", offset: 1 },
				],
			},
		},
	},
	{
		id: "mod",
		logo: {
			gradient: {
				angle: -22.5,
				stops: [
					{ color: "#61CF14", offset: 0 },
					{ color: "#0183EA", offset: 1 },
				],
			},
		},
		border: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#61CF14", offset: 0 },
					{ color: "#0183EA", offset: 1, opacity: 0.85 },
				],
			},
		},
	},
	{
		id: "admin",
		background: {
			color: "#18181b",
		},
		logo: {
			gradient: {
				angle: -45,
				stops: [
					{ color: "#db248d", offset: 0 },
					{ color: "#ff1a00", offset: 0.6 },
				],
			},
		},
		border: {
			gradient: {
				angle: 45,
				stops: [
					{ color: "#db248d", offset: 0.15 },
					{ color: "#ff1a00", offset: 1 },
				],
			},
		},
	},
] as BadgeDef[];

interface BadgeDef {
	id: string;
	background: {
		color?: string;
		component?: Component;
		gradient?: GradientDef;
	};
	logo: {
		color: string;
		gradient?: GradientDef;
	};
	border: {
		color?: string;
		gradient?: GradientDef;
	};
}
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
				padding: 0.5em;
			}
		}
		> section > h3 {
			letter-spacing: 0.1em;
			font-weight: 400;
			margin-bottom: 1em;
		}

		> section.sub-state-progress > div {
			width: 80%;

			> div.badge-list {
				display: flex;
				flex-wrap: wrap;
				gap: 0.15em;
				font-size: 16em;
			}
		}
	}
}
</style>
