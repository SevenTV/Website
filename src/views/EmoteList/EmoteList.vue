<template>
	<main class="emotes">
		<div class="listing">
			<div class="heading-block">
				<h3>Page {{ currentPage }}</h3>

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
				<span> {{ length }} emotes </span>
			</div>
			<!-- This block bends the heading downwards -->
			<div class="go-around-button" />

			<div class="emote-page" @keyup.left="paginate('previousPage')">
				<!-- The cards list shows emote cards -->
				<div ref="emotelist" class="cards-list-wrapper">
					<div v-if="loading || errored" class="loader" :class="errored ? 'has-error' : ''">
						<div ref="loadingSpinner" class="loading-spinner">
							<PpL />
						</div>
						<span v-if="loading" class="searching-title">{{ $t("emote.list.searching") }}...</span>
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
			</div>

			<div v-if="length > 0">
				<Paginator
					:page="currentPage"
					:items-per-page="queryLimit"
					:length="length"
					@change="(change) => (currentPage = change.page)"
				/>
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
import PpL from "@/components/base/ppL.vue";
import Paginator from "./Paginator.vue";

export default defineComponent({
	components: {
		Button,
		EmoteCard,
		PpL,
		Paginator,
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
		const currentPage = ref(1);
		const queryLimit = ref(50);
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
			return Math.max(1, rows * columns);
		};

		const resizeObserver = new ResizeObserver(() => {
			queryLimit.value = calculateSizedRows();
		});

		const currentAnimationState = ref(AnimationState.CENTER);

		// Construct the search query
		const query = useLazyQuery<SearchEmotes>(SearchEmotes, {}, { errorPolicy: "ignore" });
		const emotes = computed(() => query.result.value?.emotes ?? []);
		const length = computed(() => query.result.value?.metadata.emotes.count ?? 0);
		const pageCount = computed(() => length.value / queryLimit.value);

		// eslint-disable-next-line no-undef
		let slowLoad: NodeJS.Timeout;
		const slowLoading = ref(false);
		const errored = ref("");
		watch(query.loading, (v) => {
			if (slowLoad) clearTimeout(slowLoad);
			if (v) errored.value = "";
			slowLoading.value = false;
			slowLoad = setTimeout(() => {
				setSpinnerSpeed(2000);
				slowLoading.value = true;
			}, 2500);
			if (v === true) {
				setSpinnerSpeed(500);
			}
		});
		query.onError((err) => {
			errored.value = err.message;
		});

		const loadingSpinner = ref<HTMLDivElement | null>(null);
		const setSpinnerSpeed = (v: number) =>
			loadingSpinner.value?.style.setProperty("--loading-spinner-speed", v.toFixed(2) + "ms");
		onMounted(() => {
			queryLimit.value = calculateSizedRows();
			// issueSearch();
			query.load(query.document.value, {
				query: searchQuery,
				limit: Math.max(Math.min(queryLimit.value, 100), 1),
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
				currentPage.value = -1;
				query.loading.value = true;
				query.refetch({ query: searchQuery.value })?.finally(() => {
					query.loading.value = false;
					currentPage.value = 1;
				});
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
			if (
				(mode === "previousPage" && currentPage.value === 1) ||
				(mode === "nextPage" && currentPage.value > pageCount.value) ||
				query.loading.value
			) {
				return;
			}

			if (mode === "nextPage") {
				currentPage.value++;
			} else if (mode === "previousPage") {
				currentPage.value--;
			}
		};
		watch(currentPage, (n) => {
			if (currentPage.value < 1) {
				return;
			}
			query.load(query.document.value, {
				query: searchQuery.value,
				limit: Math.max(1, queryLimit.value),
				page: n,
			});
		});

		return {
			searchBar,
			emotes,
			pageCount,
			currentPage,
			queryLimit,
			length,
			emotelist,
			handleEnter,
			paginate,
			loading: query.loading,
			slowLoading,
			loadingSpinner,
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
