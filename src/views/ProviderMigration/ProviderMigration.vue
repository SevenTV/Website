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
							<strong @click="openSetSelect">
								{{ defaultEmoteSet ? defaultEmoteSet.name : "Select Set..." }}
								<Icon icon="chevron-down" />
							</strong>
						</div>
					</div>

					<div class="start-button">
						<!-- error notice -->
						<span v-if="state.failed" :style="{ color: 'red' }">
							Oops, something went wrong. If this persists please report this error to us
						</span>

						<p v-if="providerCount && defaultEmoteSet">
							This will import <UserTag :user="state.user" scale="1em" />'s emotes from
							{{ providerCount }} external provider(s)
						</p>

						<p v-if="!providerCount" :style="{ color: 'red' }">
							You must select at least 1 provider to start migrating
						</p>
						<Button
							color="primary"
							label="START"
							:disabled="!providerCount || state.started"
							@click="fetchFromProviders"
						/>
					</div>
				</template>
			</div>
			<div selector="content-right">
				<!-- Migrate Status -->
				<div v-if="state.fetching" class="status-report">
					<strong>RESOLVING EMOTES - PLEASE WAIT</strong>

					<p>{{ state.externalEmotes.length }} left to go</p>
				</div>
				<div v-else-if="state.done && !state.applied" class="status-report">
					<strong :style="{ color: 'lime' }">
						We've gathered emotes we think are similar, click on your favorites to enable them. You can also
						use the "Apply All Best Matches" to get the most popular match for each.
					</strong>
				</div>
				<div v-else-if="state.applied" class="status-report">
					<strong>Picking best matches, please wait...</strong>
				</div>

				<div class="load-indicator">
					<LoadingSpinner v-if="state.fetching || state.applied" :speed="2000" :radius="4" />
				</div>

				<!-- Display Results -->
				<div class="results">
					<div v-for="rec of state.results" :key="rec.name" :picked="!!rec.picked" class="result-record">
						<h3>{{ rec.name }}</h3>

						<div class="suggestions">
							<span
								v-for="e of rec.suggestions"
								:key="e.id"
								class="suggestion-card-wrapper"
								:selected="rec.picked === e.id"
								@click.prevent="useEmote(rec, e)"
							>
								<EmoteCard :decorative="true" :emote="e" />
							</span>
						</div>
					</div>
				</div>

				<!-- Apply All -->
				<div v-if="state.done && !state.applied" class="apply-all">
					<Button
						color="primary"
						label="APPLY ALL BEST MATCHES"
						:style="{ width: '50vw' }"
						@click="applyAll"
					/>
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
import { computed, reactive, watch } from "vue";
import { Emote } from "@/structures/Emote";
import { transformProvider1 } from "./ProviderUtils";
import { useLazyQuery, useQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@/assets/gql/emotes/search";
import { storeToRefs } from "pinia";
import { useModal } from "@/store/modal";
import { useMutationStore } from "@/store/mutation";
import { useRouter } from "vue-router";
import type { User } from "@/structures/User";
import LoginButton from "@/components/utility/LoginButton.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Button from "@/components/utility/Button.vue";
import LoadingSpinner from "@/components/utility/LoadingSpinner.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import SelectEmoteSetVue from "@/components/modal/SelectEmoteSet/SelectEmoteSet.vue";
import UserTag from "@/components/utility/UserTag.vue";
import Icon from "@/components/utility/Icon.vue";
import gql from "graphql-tag";
import ModalCopyDataVue from "./ModalCopyData.vue";

const { t } = useI18n();
const actor = useActor();
const router = useRouter();
const { defaultEmoteSet, defaultEmoteSetID } = storeToRefs(actor);

interface ResultRecord {
	name: string;
	suggestions: Emote[];
	picked: string;
}

const state = reactive({
	started: false,
	fetching: false,
	done: false,
	applied: false,
	failed: false,
	externalEmotes: [] as Emote[],
	user: (defaultEmoteSet.value?.owner ?? null) as User | null,
	providers: [
		{
			id: "1",
			name: () => window.atob("QmV0dGVyVFRW"),
			checked: false,
		},
	],
	results: [] as ResultRecord[],
});
const providerCount = computed(() => state.providers.filter((x) => x.checked).length);
watch(
	defaultEmoteSet,
	() => {
		state.user = defaultEmoteSet.value?.owner ?? null;
	},
	{ immediate: true },
);

const modal = useModal();
const search = useLazyQuery<SearchEmotes>(SearchEmotes);

search.onResult((res) => {
	const name = res.data.emotes.items[0].name;
	if (!name) return;

	state.results.push({
		name,
		suggestions: res.data.emotes.items,
		picked: "",
	});
});

async function fetchFromProviders() {
	if (!defaultEmoteSet.value) return;

	state.user = defaultEmoteSet.value.owner;
	const twc = state.user.connections.find((uc) => uc.platform === "TWITCH");
	if (!twc) return;

	state.started = true;
	state.failed = false;
	state.fetching = true;

	// Fetch from Provider 1
	await new Promise<void>((ok) => {
		const { onResult } = useQuery<{ proxy_url: string }>(
			gql`
				query GetProxyURL($id: Int!) {
					proxy_url(id: $id)
				}
			`,
			{ id: 1 },
		);

		onResult((pres) => {
			modal.open("copy-data-prompt", {
				component: ModalCopyDataVue,
				props: {
					url: `${pres.data.proxy_url}/${twc.id}`,
					providerName: state.providers[0].name(),
				},
				events: {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					data: (data: Record<string, any>) => {
						for (const e of data.sharedEmotes ?? []) {
							state.externalEmotes.push(transformProvider1(e));
						}

						ok();
					},
				},
			});
		});
	});

	// Done fetching external data
	// Now we can start issuing search requests for equivalents
	for (;;) {
		if (state.externalEmotes.length === 0) {
			state.fetching = false;
			state.done = true;

			break;
		}

		const e = state.externalEmotes.shift();
		if (!e) continue;

		// skip if this emote is already in the set
		const exists = defaultEmoteSet.value?.emotes.find((x) => x.name === e.name);
		if (exists) continue;

		search.variables.value = {
			query: e.name,
			page: 1,
			limit: 5,
			filter: {
				exact_match: true,
				ignore_tags: true,
			},
		};

		search.load(search.document.value, search.variables.value);

		await new Promise<void>((ok) => {
			watch(
				search.loading,
				(loading) => {
					if (loading) return;

					setTimeout(() => ok(), 150);
				},
				{ immediate: true },
			);
		});
	}
}

const m = useMutationStore();
function useEmote(rec: ResultRecord, emote: Emote): void {
	rec.picked = emote.id;

	m.setEmoteInSet(defaultEmoteSetID.value, "ADD", emote.id).then(() => {
		rec.picked = emote.id;
	});
}

async function applyAll() {
	if (state.applied) return;

	state.applied = true;

	const buf = [] as Promise<unknown>[];
	for (const rec of state.results) {
		if (rec.picked || !rec.suggestions[0]) continue;

		buf.push(
			m.setEmoteInSet(defaultEmoteSetID.value, "ADD", rec.suggestions[0].id).catch(() => {
				// ignore
			}),
		);

		if (buf.length >= 5) {
			await Promise.all(buf).catch(() => {
				// ignore
			});

			buf.length = 0;
		}
	}

	router.push({ name: "EmoteSet", params: { setID: defaultEmoteSetID.value } });
}

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
		display: flex;
		justify-content: end;
		width: 100%;
		height: 100%;

		> [selector="content-left"] {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-top: 9em;
			padding: 1em;
			font-size: 1.35em;
			padding-right: 2.5em;

			.sign-in-required {
				gap: 1em;
				text-align: center;
				> h4 {
					margin-bottom: 0.5em;
				}
			}

			.provider-select {
				display: grid;
				gap: 0.5em;

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
			padding-left: 3em;
			display: flex;
			align-items: center;
			flex-grow: 1;
			flex-direction: column;
			padding-top: 1em;

			.status-report {
				display: flex;
				flex-direction: column;
				text-align: center;
				align-items: center;
				justify-content: center;
				width: fit-content;
				max-width: 21em;
				padding: 1em;
				font-size: 1.5rem;

				> strong {
					margin-bottom: 1em;
				}
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
				padding-bottom: 4em;

				.result-record[picked="true"] {
					.suggestion-card-wrapper[selected="false"] {
						opacity: 0.25;
						pointer-events: none;
					}
				}

				.suggestion-card-wrapper {
					cursor: pointer;

					&:hover {
						filter: drop-shadow(0 0 0.1em currentColor);
					}
				}

				.suggestions {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5em;
				}
			}

			.apply-all {
				display: flex;
				position: fixed;
				bottom: 0;
				height: 3em;
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
			flex-direction: column;
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
