<template>
	<main class="emotes">
		<div class="listing">
			<div class="heading-block">
				<h3>Page {{ pageCounter }}</h3>

				<!-- Search Bar -->
				<div class="input-group">
					<input
						ref="searchBar"
						class="search-bar"
						@blur="handleEnter"
						@keydown.stop="handleEnter"
						v-model="data.searchValue"
						required
					/>
					<label>
						<font-awesome-icon :icon="['fas', 'search']" />
						<span>Search</span>
					</label>
				</div>
			</div>

			<!--
				The heading block is the primary heading, siting atop of the content area
				It displays pagination information
			-->
			<div class="create-button-wrapper">
				<div class="create-button">
					<Button fa-icon="plus" label="ADD EMOTE" color="primary" use-route="/emotes/create" />
				</div>
				<div class="fill-around"></div>
			</div>

			<!--
				This is the other end of the header, which bends around the button
				and displays the total amount of emotes
			-->
			<div class="heading-end">
				<span>31.4K emotes</span>
			</div>
			<!-- This block bends the heading downwards -->
			<div class="go-around-button" />

			<div class="emote-page" @keyup.left="paginate('previousPage')">
				<div class="page-switch-button">
					<div v-if="pageCounter > 1 && !errored" class="inner" @click="paginate('previousPage')">
						<font-awesome-icon class="chevron" size="5x" :icon="['fas', 'chevron-left']" />
					</div>
				</div>

				<!-- The cards list shows emote cards -->
				<div ref="emotelist" class="cards-list-wrapper">
					<div class="loader" v-if="loading || errored" :class="errored ? 'has-error' : ''">
						<font-awesome-icon :icon="['fas', loading ? 'slash' : 'exclamation']" :pulse="loading" />
						<span class="searching-title" v-if="loading">Searching</span>
						<span class="searching-slow" v-if="loading && slowLoading">
							This is taking a while, service may be degraded
						</span>
						<span class="searching-error" v-if="errored">
							{{ errored }}
						</span>
						<Button
							v-if="!loading && errored"
							label="RETRY"
							color="warning"
							@click="() => paginate('reload')"
							>RETRY</Button
						>
					</div>

					<div class="cards-list" ref="cardList" v-else>
						<EmoteCard :emote="emote" v-for="emote in emotes" :key="emote.id" />
					</div>
				</div>

				<div class="page-switch-button">
					<div v-if="!errored" class="inner" @click="paginate('nextPage')">
						<font-awesome-icon class="chevron" size="5x" :icon="['fas', 'chevron-right']" />
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@gql/emotes/search";
import { Emote } from "@structures/Emote";
import Button from "@utility/Button.vue";
import EmoteCard from "@utility/EmoteCard.vue";

export default defineComponent({
	components: {
		Button,
		EmoteCard,
	},

	setup() {
		const searchBar = ref(null);

		// Form data
		const data = reactive({
			searchValue: "",
		});
		const query = ref(""); // The current query for the api request

		const pageCounter = ref(1);
		useHead({
			title: "7TV | Emotes",
		});

		enum animationState {
			LEFT,
			RIGHT,
			CENTER,
		}

		const queryEmoteCount = ref(50);

		const emotelist = ref<HTMLElement | null>(null);

		/**
		 * Calculate how many rows and columns according to the container's size
		 *
		 * @returns the result of rows * columns
		 */
		const calculateSizedRows = (): number | null => {
			if (!emotelist.value) {
				return null;
			}

			const marginBuffer = 24; // The margin _in pixels between each card
			const cardSize = 140; // The size of the cards in pixels
			const width = emotelist.value?.clientWidth; // The width of emotes container
			const height = emotelist.value?.clientHeight; // The height of the emotes container

			const rows = Math.floor(width / (cardSize + marginBuffer)); // The calculated amount of rows
			const columns = Math.floor(height / (cardSize + marginBuffer)); // The calculated amount of columns

			// Return the result of rows multiplied by columns
			console.log(rows * columns);
			return rows * columns;
		};

		const resizeObserver = new ResizeObserver(() => {
			queryEmoteCount.value = (calculateSizedRows() ?? 20) * 3;
		});

		const currentAnimationState = ref(animationState.CENTER);

		// Construct the search query
		const transformEmotes = (data: Emote[]): Emote[] =>
			data.map((e) => {
				return e;
			});
		const { result, refetch, fetchMore, loading, onError } = useQuery<SearchEmotes>(
			SearchEmotes,
			{
				query,
				pageSize: Math.min(queryEmoteCount.value, 100) * 3,
			},
			{ errorPolicy: "ignore" }
		);

		watch(result, (value) => {
			// Watch for changes & modify emote list
			emotes.value = [];
			emotes.value.push(...transformEmotes(value?.emotes ?? []));
		});

		// eslint-disable-next-line no-undef
		let slowLoad: NodeJS.Timeout;
		const slowLoading = ref(false);
		const errored = ref("");
		watch(loading, (v) => {
			if (slowLoad) clearTimeout(slowLoad);
			if (v) errored.value = "";
			slowLoading.value = false;
			slowLoad = setTimeout(() => {
				slowLoading.value = true;
			}, 2500);
		});
		onError((err) => {
			errored.value = err.message;
		});

		// TODO
		const emotes2 = reactive({
			before: [] as Emote[],
			current: [] as Emote[],
			after: [] as Emote[],
		});

		const emotes = ref([] as Emote[]);
		const issueSearch = async () => {
			loading.value = true;
			if (query.value !== data.searchValue) {
				query.value = data.searchValue;
			} else {
				loading.value = true;
				refetch({ query: query.value })
					?.then((x) => {
						emotes.value = transformEmotes(x.data.emotes ?? []);
						pageCounter.value = 1;
					})
					.finally(() => (loading.value = false));
			}
		};

		// Handle search change (enter keypress or input blur)
		const handleEnter = (ev: KeyboardEvent | FocusEvent) => {
			if (ev instanceof KeyboardEvent && ev.key !== "Enter") {
				return;
			}
			issueSearch();
		};

		// Handle search change (enter keypress or input blur)
		const handleArrowKeys = (ev: KeyboardEvent | FocusEvent) => {
			if ((ev instanceof KeyboardEvent && ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") || loading.value) {
				return;
			}
			if (ev instanceof KeyboardEvent && ev.key === "ArrowLeft") {
				paginate("previousPage");
			}
			if (ev instanceof KeyboardEvent && ev.key === "ArrowRight") {
				paginate("nextPage");
			}
		};

		/** Paginate: change the current page */
		const paginate = (mode: "nextPage" | "previousPage" | "reload") => {
			if ((mode === "previousPage" && pageCounter.value === 1) || loading.value) {
				return;
			}
			loading.value = true;
			fetchMore({
				variables: {
					nextPage: {
						after: emotes.value[emotes.value.length - 1].id,
					},
					previousPage: {
						before: emotes.value[0].id,
					},
					reload: {},
				}[mode],
			})
				?.then((x) => {
					emotes.value = transformEmotes(x.data.emotes ?? []);
					if (mode === "nextPage") {
						pageCounter.value++;
					} else if (mode === "previousPage") {
						pageCounter.value--;
					}
				})
				.finally(() => (loading.value = false));
		};

		onMounted(() => {
			issueSearch();

			document.addEventListener("keyup", handleArrowKeys);

			if (emotelist.value) {
				resizeObserver.observe(emotelist.value);
			}
		});

		onBeforeUnmount(() => {
			document.removeEventListener("keyup", handleArrowKeys);
			resizeObserver.disconnect();
		});

		return {
			searchBar,
			emotes,
			pageCounter,
			emotelist,
			handleEnter,
			handleArrowKeys,
			paginate,
			loading,
			slowLoading,
			errored,
			data,
			currentAnimationState,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/emotes.scss";
</style>
