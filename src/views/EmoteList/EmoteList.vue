<template>
	<main class="emotes">
		<div class="listing">
			<div class="heading-block">
				<h3>Page {{ pageCounter }}</h3>

				<!-- Search Bar -->
				<div class="input-group">
					<input
						ref="searchBar"
						v-model="data.searchValue"
						class="search-bar"
						required
						@blur="handleEnter"
						@keydown.stop="handleEnter"
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
					<div v-if="loading || errored" class="loader" :class="errored ? 'has-error' : ''">
						<font-awesome-icon :icon="['fas', loading ? 'slash' : 'exclamation']" :pulse="loading" />
						<span v-if="loading" class="searching-title">Searching</span>
						<span v-if="loading && slowLoading" class="searching-slow">
							This is taking a while, service may be degraded
						</span>
						<span v-if="errored" class="searching-error">
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

					<div v-else ref="cardList" class="cards-list">
						<EmoteCard v-for="emote in emotes" :key="emote.id" :emote="emote" />
					</div>
				</div>

				<div class="page-switch-button">
					<div v-if="hasItemsAhead && !errored" class="inner" @click="paginate('nextPage')">
						<font-awesome-icon class="chevron" size="5x" :icon="['fas', 'chevron-right']" />
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch, computed } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@gql/emotes/search";
import Button from "@utility/Button.vue";
import EmoteCard from "@utility/EmoteCard.vue";

export default defineComponent({
	components: {
		Button,
		EmoteCard,
	},

	setup() {
		useHead({
			title: "Emote Directory - 7TV",
		});

		// Form data
		const data = reactive({
			searchValue: "",
		});
		const searchBar = ref(null);
		const searchQuery = ref(""); // The current query for the api request
		const pageCounter = ref(1);
		const queryEmoteCount = ref(50);
		const emotelist = ref<HTMLElement | null>(null);

		/**
		 * Calculate how many rows and columns according to the container's size
		 *
		 * @returns the result of rows * columns
		 */
		const calculateSizedRows = (): number => {
			if (!emotelist.value) {
				return 0;
			}

			const marginBuffer = 24; // The margin _in pixels between each card
			const cardSize = 140; // The size of the cards in pixels
			const width = emotelist.value?.clientWidth; // The width of emotes container
			const height = emotelist.value?.clientHeight; // The height of the emotes container

			const rows = Math.floor(width / (cardSize + marginBuffer)); // The calculated amount of rows
			const columns = Math.floor(height / (cardSize + marginBuffer)); // The calculated amount of columns

			// Return the result of rows multiplied by columns
			return rows * columns;
		};

		const resizeObserver = new ResizeObserver(() => {
			queryEmoteCount.value = calculateSizedRows();
		});

		const currentAnimationState = ref(AnimationState.CENTER);

		// Construct the search query
		const query = useLazyQuery<SearchEmotes>(SearchEmotes, {}, { errorPolicy: "ignore" });
		const emotes = computed(() => query.result.value?.emotes ?? []);
		const total = computed(() => query.result.value?.metadata.emotes.total ?? 0);

		// eslint-disable-next-line no-undef
		let slowLoad: NodeJS.Timeout;
		const slowLoading = ref(false);
		const errored = ref("");
		watch(query.loading, (v) => {
			if (slowLoad) clearTimeout(slowLoad);
			if (v) errored.value = "";
			slowLoading.value = false;
			slowLoad = setTimeout(() => {
				slowLoading.value = true;
			}, 2500);
		});
		query.onError((err) => {
			errored.value = err.message;
		});

		onMounted(() => {
			queryEmoteCount.value = calculateSizedRows();
			// issueSearch();
			query.load(query.document.value, {
				query: searchQuery,
				limit: Math.min(queryEmoteCount.value, 100),
			});

			document.addEventListener("keyup", handleArrowKeys);

			if (emotelist.value) {
				resizeObserver.observe(emotelist.value);
			}
		});
		onBeforeUnmount(() => {
			document.removeEventListener("keyup", handleArrowKeys);
			resizeObserver.disconnect();
		});

		// TODO
		/*
		const emotes = reactive({
			before: [] as Emote[],
			current: [] as Emote[],
			after: [] as Emote[],
		});
		*/

		const issueSearch = async () => {
			query.loading.value = true;
			if (searchQuery.value !== data.searchValue) {
				searchQuery.value = data.searchValue;
			} else {
				query.loading.value = true;
				query
					.refetch({ query: searchQuery.value })
					?.then(() => {
						pageCounter.value = 1;
					})
					.finally(() => (query.loading.value = false));
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
			if (
				(ev instanceof KeyboardEvent && ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") ||
				query.loading.value
			) {
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
			if ((mode === "previousPage" && pageCounter.value === 1) || query.loading.value) {
				return;
			}
			query.loading.value = true;

			const after = emotes.value[emotes.value.length - 1]?.id;
			const before = emotes.value[0]?.id;
			query.load(query.document.value, {
				query: searchQuery.value,
				limit: queryEmoteCount.value,
				...{
					nextPage: {
						after,
					},
					previousPage: {
						before,
					},
					reload: {},
				}[mode],
			});
			if (mode === "nextPage") {
				pageCounter.value++;
			} else if (mode === "previousPage") {
				pageCounter.value--;
			}
		};
		const hasItemsAhead = computed(() => total.value >= queryEmoteCount.value);

		return {
			searchBar,
			emotes,
			pageCounter,
			emotelist,
			handleEnter,
			// handleArrowKeys,
			paginate,
			loading: query.loading,
			slowLoading,
			hasItemsAhead,
			errored,
			data,
			currentAnimationState,
		};
	},
});

enum AnimationState {
	LEFT,
	RIGHT,
	CENTER,
}
</script>

<style lang="scss" scoped>
@import "@scss/emotes.scss";
</style>
