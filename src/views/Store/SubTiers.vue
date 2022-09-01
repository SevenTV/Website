<template>
	<main class="sub-tiers">
		<div class="t1-features feature-list">
			<h3>{{ egv.subscribed ? t("store.sub.current_plan") : t("store.sub.incentive") }}</h3>

			<div v-for="f of features.t1" :key="f.name" class="sub-feature" :class="{ indev: f.indev }">
				<Badge
					v-if="f.icon === '_badge'"
					:logo="{ color: 'black' }"
					:background="{ color: 'white' }"
					:style="{ width: '1.5em' }"
				/>
				<Icon v-else-if="f.icon" size="xl" :icon="f.icon" />
				<span> {{ t(`store.sub.${f.name}`) }} </span>
			</div>
		</div>

		<!-- Extra -->
		<div class="extra-tier">
			<Icon size="lg" icon="plus" />
		</div>

		<div class="t2-features feature-list" :class="{ troll: trolled }">
			<span>Coming Soon</span>
			<h3 ref="epicTroll">
				{{ "Cras at tempor enim" ?? t("store.sub.creator_tier") }}

				<span>{{ "Mauris pulvinar consequat orci non eleifend" ?? t("store.sub.creator_tier_desc") }}</span>
			</h3>
			<div v-for="f of features.t2" :key="f.name" class="sub-feature">
				<Icon v-if="f.icon" size="xl" :icon="f.icon" />
				<span> {{ f.name ?? t(`store.sub.${f.name}`) }} </span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault.js";
import Icon from "@/components/utility/Icon.vue";
import Badge from "@/components/base/Badge.vue";

const { t } = useI18n();

const features = {
	t1: [
		{ name: "feature_t1_badge", icon: "_badge" },
		{ name: "feature_t1_paints", icon: "brush" },
		{ name: "feature_t1_animated_profile_picture", icon: "user" },
		{ name: "feature_t1_zero_width", icon: "object-group" },
		{ name: "feature_t1_global_raffle", icon: "ticket" },
		{ name: "feature_t1_personal_emotes", icon: "smile", indev: true },
	] as Feature[],
	t2: [
		{ name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" ?? "feature_t2_animated_profile_banner" },
		{ name: "Etiam fermentum malesuada ante eu ornare" ?? "feature_t2_animated_offline_screen" },
		{ name: "Donec at ornare eros. Etiam a porta nisl, non posuere metus" ?? "feature_t2_extended_sub_emotes" },
	] as Feature[],
};

const egv = useEgVault();

interface Feature {
	name: string;
	icon: string;
	description: string;
	indev?: boolean;
}

// le epic troll
const epicTroll = ref<HTMLHeadingElement>();
const trolled = ref(false);
onMounted(() => {
	setInterval(() => {
		if (!epicTroll.value) {
			return;
		}

		const v = getComputedStyle(epicTroll.value).filter;
		if (v === "none") {
			trolled.value = true;
		}
	}, 1000);
});
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.sub-tiers {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-left: 3em;
	padding-right: 3em;

	min-width: 33%;
	max-width: 50%;

	@include themify() {
		background-color: mix(themed("backgroundColor"), themed("color"), 97.5);
		.sub-feature {
			background-color: lighten(themed("backgroundColor"), 3);
		}

		> .feature-list {
			&.t1-features {
				border: 0.2em solid mix($subColor, themed("extreme"), 75);
			}

			&.t2-features {
				border: 0.2em solid mix(themed("primary"), themed("extreme"), 75);
			}
		}
	}

	> h3 {
		font-family: Ubuntu, sans-serif;
		font-size: 1.5em;
	}

	$cardSize: 8em;
	> .feature-list {
		display: grid;
		grid-template-columns: $cardSize $cardSize $cardSize;
		grid-template-areas:
			"header header header"
			"content content content";
		gap: 1.5em;
		margin-top: 1em;
		margin-bottom: 1em;

		> h3 {
			grid-area: header;
			text-align: center;
			font-size: 1.5em;

			> span {
				display: block;
				font-weight: initial;
				font-size: 0.8em;
			}
		}

		&.t1-features,
		&.t2-features {
			grid-area: content;
			border-radius: 0.5em;
			padding: 1em;

			// in development notice
			> .indev {
				padding-top: 2em;

				> span {
					margin-top: 1em;
				}
			}
			> .indev:after {
				content: "IN DEVELOPMENT";
				color: white;
				letter-spacing: 0.1em;
				font-weight: 700;
				border-radius: 0.25em;
				padding: 0.85em;
				display: flex;
				white-space: nowrap;
				align-items: center;
				justify-content: center;
				font-size: 0.85rem;
				box-shadow: 0.25em 0.25em 0.25em black;
				backdrop-filter: blur(0.1em);
				position: relative;
				left: -1em;
				bottom: 4em;
				transform: rotate(45deg);
				width: 125%;
				height: 1.25em;
				background-color: rgba(0, 0, 0, 50%);
				animation: indev 3s ease-in-out infinite;
			}

			@keyframes indev {
				0% {
					opacity: 0.1;
				}
				50% {
					opacity: 0.95;
				}
				100% {
					opacity: 0.1;
				}
			}
		}

		&.t2-features {
			user-select: none;
			pointer-events: none;
			> * {
				filter: blur(0.5em);
			}

			&.troll {
				background-image: url("https://cdn.7tv.app/emote/6156a3c487e47156a00db9e4/4x.avif");
				background-repeat: round;

				> span:first-child {
					display: none;
				}
				> div.sub-feature {
					opacity: 0.85;
				}

				h3,
				.sub-feature > span {
					text-indent: -999em;
					line-height: 0;
				}

				> :nth-child(3):after {
					content: "Never gonna give you up";
				}
				> :nth-child(4):after {
					content: "Never gonna let you down";
				}
				> :nth-child(5):after {
					content: "Never gonna run around and desert you";
				}
			}

			> span:first-child {
				position: absolute;
				filter: initial;
				margin: 0.5em;
				color: rgb(255, 70, 70);
				text-shadow: 0.1em 0.1em 0.1em red;
			}
		}
	}

	div.extra-tier {
		font-size: 1.5em;
		padding: 0.25em;
		border-radius: 10%;
		border: 0.1em solid;
	}

	.sub-feature {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		border-radius: 0.25em;
		text-align: center;
		overflow-wrap: break-word;
		width: $cardSize;
		min-height: $cardSize;
		padding: 0.5em;
	}

	@media screen and (max-width: 1500px) {
		align-items: center;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		margin: 0;
		gap: 0.5em;
		max-width: initial;

		> div.extra-tier {
			margin-left: 1em;
			margin-right: 1em;
		}
	}

	@media screen and (max-width: 1200px) {
		column-gap: 100%;
		padding: 0;
	}
}
</style>
