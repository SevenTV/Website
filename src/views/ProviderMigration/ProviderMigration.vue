<template>
	<main class="provider-migration">
		<!-- Heading -->
		<div selector="heading">
			<div>
				<div>
					<h1>{{ t("migrate.heading") }}</h1>
				</div>
			</div>

			<div>
				<p>{{ t("migrate.pitch") }}</p>
			</div>
		</div>

		<div selector="content-wrapper">
			<div selector="content-left">
				<template v-if="!actor.id">
					<div class="sign-in-required">
						<h4>Please sign in to start</h4>
						<LoginButton />
					</div>
				</template>

				<template v-else>
					<div class="provider-select">
						<p>{{ t("migrate.select_providers") }}</p>
						<div
							v-for="provider of state.providers"
							:key="provider.id"
							v-wave
							class="provider-card"
							@click="provider.checked = !provider.checked"
						>
							<h3>{{ provider.name() }}</h3>
							<Checkbox :style="{ pointerEvents: 'none' }" :checked="provider.checked" />
						</div>

						<!-- Select Emote Set -->
						<div class="set-select">
							<p>Which set should the imported emotes be added to?</p>
							<strong @click="openSetSelect">{{
								defaultEmoteSet ? defaultEmoteSet.name : "Select Set..."
							}}</strong>
						</div>
					</div>

					<div class="start-button">
						<p v-if="!anyProviderSelected" :style="{ color: 'red' }">
							You must select at least 1 provider to start migrating
						</p>
						<Button
							color="primary"
							label="START"
							:disabled="!anyProviderSelected || state.started"
							@click="fetchFromProviders"
						/>
					</div>
				</template>
			</div>
			<div selector="content-right">
				<!-- Migrate Status -->
				<div v-if="state.fetching" class="status-report">
					<p>RESOLVING EMOTES; PLEASE WAIT</p>
				</div>

				<div class="load-indicator">
					<LoadingSpinner v-if="state.fetching" :speed="2000" :radius="4" />
				</div>

				<!-- Display Results -->
				<div class="results">
					<div v-for="rec of state.results" :key="rec.name" class="result-record">
						<h3>{{ rec.name }}</h3>

						<div class="suggestions">
							<EmoteCard v-for="e of rec.suggestions" :key="e.id" :emote="e" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Logo Float -->
		<LogoMigrate class="logo-float" />
	</main>
</template>

<script setup lang="ts">
import LogoMigrate from "@/components/base/LogoMigrate.vue";
import { useActor } from "@/store/actor";
import { useI18n } from "vue-i18n";
import { computed, reactive } from "vue";
import { Emote } from "@/structures/Emote";
import { transformProvider1 } from "./ProviderUtils";
import { useLazyQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@/assets/gql/emotes/search";
import { storeToRefs } from "pinia";
import { useModal } from "@/store/modal";
import LoginButton from "@/components/utility/LoginButton.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Button from "@/components/utility/Button.vue";
import LoadingSpinner from "@/components/utility/LoadingSpinner.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import SelectEmoteSetVue from "@/components/modal/SelectEmoteSet/SelectEmoteSet.vue";

const { t } = useI18n();
const actor = useActor();
const { defaultEmoteSet } = storeToRefs(actor);

interface ResultRecord {
	name: string;
	suggestions: Emote[];
}

const state = reactive({
	started: false,
	fetching: false,
	externalEmotes: [] as Emote[],
	providers: [
		{
			id: "1",
			name: () => window.atob("QmV0dGVyVFRW"),
			checked: false,
		},
	],
	results: [] as ResultRecord[],
});
const anyProviderSelected = computed(() => state.providers.some((x) => x.checked));

const search = useLazyQuery<SearchEmotes>(SearchEmotes);

search.onResult((res) => {
	const name = res.data.emotes.items[0].name;
	if (!name) return;

	state.results.push({
		name,
		suggestions: res.data.emotes.items,
	});
});

async function fetchFromProviders() {
	const twc = actor.connections.find((uc) => uc.platform === "TWITCH");
	if (!twc) return;

	state.started = true;
	state.fetching = true;

	// Fetch from Provider 1
	await new Promise<void>((ok) => {
		fetch(`${window.atob(import.meta.env.VITE_APP_MIGRATE_PROVIDER_1)}/cached/users/twitch/${twc.id}`)
			.then((res) => res.json())
			.then((data) => {
				for (const e of data.sharedEmotes ?? []) {
					state.externalEmotes.push(transformProvider1(e));
				}

				ok();
			});
	});

	// Done fetching external data
	// Now we can start issuing search requests for equivalents
	const interval = setInterval(() => {
		if (state.externalEmotes.length === 0) {
			clearInterval(interval);
			state.fetching = false;

			return;
		}

		const e = state.externalEmotes.shift();
		if (!e) return;

		search.variables.value = {
			query: e.name,
			page: 1,
			limit: 5,
			filter: {
				exact_match: true,
			},
		};

		search.load(search.document.value, search.variables.value);
	}, 500);
}

const modal = useModal();
const openSetSelect = () => {
	const key = "emote-set-select-from-emote-list";
	modal.open(key, {
		component: SelectEmoteSetVue,
		props: {
			mode: "assign",
		},
		events: {
			assign: (id: string) => actor.setDefaultEmoteSetID(id),
		},
	});
	return null;
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.provider-migration {
	@include themify() {
		> [selector="heading"] {
			> div:nth-child(1) {
				filter: drop-shadow(0.1em 0.25em 0 themed("primary"));

				> div {
					background-color: themed("navBackgroundColor");
				}
			}
		}

		[selector="content-wrapper"] {
			> [selector="content-right"] {
				background-color: lighten(themed("backgroundColor"), 2);
				.status-report {
					background-color: darken(themed("backgroundColor"), 0.5);
				}
			}
		}
	}

	[selector="heading"] {
		z-index: 1;
		position: fixed;
		display: grid;

		> div:nth-child(1) > div {
			width: fit-content;
			clip-path: polygon(0 0, 100% 0%, 85% 100%, 0% 100%);
			padding: 1em 8em;
		}

		> div:nth-child(2) {
			font-size: 1.5em;

			max-width: 24em;
			padding-bottom: 0.5em;
			transform: translate(1em, 1em);
			border-bottom: 0.01em solid currentColor;
		}
	}

	[selector="content-wrapper"] {
		display: grid;
		justify-content: end;
		grid-template-columns: 40% 60%;
		width: 100%;
		height: 100%;

		> [selector="content-left"] {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-top: 9em;
			clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
			padding: 1em;
			font-size: 1.35em;

			.sign-in-required {
				gap: 1em;
				text-align: center;
				> h4 {
					margin-bottom: 0.5em;
				}
			}

			.provider-select {
				> p {
					margin-bottom: 0.5em;
				}

				.provider-card {
					cursor: pointer;
					display: flex;
					gap: 1em;
					width: fit-content;
					padding: 1em 0.5em;
					align-items: center;
					margin-bottom: 1em;
					border-radius: 0.33em;
					background-color: black;
				}

				.set-select {
					cursor: pointer;
					display: grid;
					gap: 0.5em;

					> strong {
						width: fit-content;
						padding: 1em;
						background-color: black;
						border-radius: 0.33em;
					}
				}
			}

			.start-button {
				text-align: center;
				display: grid;
				row-gap: 0.5em;
			}
		}

		> [selector="content-right"] {
			padding-left: 10em;
			padding-top: 1em;
			clip-path: polygon(15% 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0% 50%);

			.status-report {
				display: flex;
				text-align: center;
				align-items: center;
				justify-content: center;
				width: fit-content;
				padding: 1em;
				font-size: 1.5rem;
			}

			.load-indicator {
				display: float;
				bottom: 16em;
				right: 16em;
				position: fixed;
			}

			.results {
				display: grid;
				row-gap: 1em;
				padding-bottom: 1em;

				.suggestions {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5em;
				}
			}
		}
	}

	.logo-float {
		position: fixed;
		margin-top: 1rem;
		margin-right: 1rem;
		right: 0;
		font-size: 12em;
	}

	@media screen and (max-width: 1500px) {
		[selector="heading"] {
			> div:nth-child(1) {
				> div {
					padding: 1em 4em;
				}
			}
		}

		[selector="content-wrapper"] {
			grid-template-columns: 1fr;
			margin-top: 1.5em;

			[selector="content-left"],
			[selector="content-right"] {
				clip-path: none;
			}
		}

		.logo-float {
			visibility: hidden;
		}
	}
}
</style>
