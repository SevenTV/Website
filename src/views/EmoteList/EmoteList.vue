<template>
	<main class="emotes">
		<div class="listing">
			<div class="above-content">
				<div v-if="preferredFormat === ImageFormat.AVIF" class="avif-experiment">
					<LogoAVIF />
					<div>
						<p>EXPERIMENTAL</p>
						<p>Viewing images in AVIF format</p>
					</div>
				</div>

				<div class="heading-block">
					<!-- Category Selector -->
					<div class="heading-item category-selector">
						<CategorySelector :initial-value="category" @update="(cat) => (category = cat)" />
					</div>

					<!-- Search Bar -->
					<div class="heading-item search">
						<TextInput v-model="queryVariables.query" :label="t('common.search')" :icon="['far', 'search']">
							<template #icon>
								<Icon icon="search" />
							</template>
						</TextInput>

						<div class="search-filters-button" @click="searchFilterMenu = !searchFilterMenu">
							<Icon icon="gear" />
						</div>
						<div v-if="searchFilterMenu" ref="searchFilterMenuRef" class="search-filters">
							<div>
								<Checkbox
									v-model="queryVariables.filter.exact_match"
									:checked="queryVariables.filter.exact_match"
									:label="t('emote.list.filters.exact_match')"
								/>
								<Checkbox
									v-model="queryVariables.filter.case_sensitive"
									:checked="queryVariables.filter.case_sensitive"
									:label="t('emote.list.filters.case_sensitive')"
								></Checkbox>
								<Checkbox
									v-model="queryVariables.filter.ignore_tags"
									:checked="queryVariables.filter.ignore_tags"
									:label="t('emote.list.filters.ignore_tags')"
									:disabled="queryVariables.filter.exact_match"
								></Checkbox>
							</div>
						</div>
					</div>
				</div>

				<div class="create-button-wrapper">
					<div class="create-button">
						<Button
							fa-icon="hexagon-plus"
							:label="t('emote.add').toUpperCase()"
							color="accent"
							use-route="/emotes/create"
							appearance="outline"
						/>
					</div>
					<div class="fill-around"></div>
				</div>

				<div class="heading-end">
					<span> {{ t("emote.list.emote_count", [itemCount]) }} </span>
				</div>
				<div class="down-edge" />
			</div>

			<div class="emote-page" @keypress.left="paginate('previousPage')">
				<!-- The cards list shows emote cards -->
				<div ref="emotelist" class="cards-list-wrapper">
					<div :class="{ loading }" class="cards-list">
						<EmoteCard v-for="(emote, i) in emotes" :key="i" :emote="emote" :unload="unloadImages" />
					</div>

					<div v-if="loading" class="loader" :class="errored ? 'has-error' : ''">
						<div v-if="loading">
							<div ref="loadingSpinner" class="loading-spinner">
								<PpL />
							</div>
							<span v-if="loading" class="searching-title">{{ t("emote.list.searching") }}...</span>
							<p v-if="loading && slowLoading" class="searching-slow">
								{{ t("emote.list.fetching_slowly") }}
							</p>
						</div>
						<span v-else-if="errored" class="searching-error">
							{{ errored }}
						</span>
					</div>
					<div v-else-if="emotes.length === 0" class="no-emotes">
						<span>{{ t("emote.list.no_emotes_listed") }}</span>
					</div>
				</div>
			</div>

			<!-- Pagination -->
			<div v-if="itemCount > 0" class="util-block">
				<EmoteListUtilBar
					:pagination="{ page: queryVariables.page, limit: queryVariables.limit, total: itemCount }"
					@page="(page) => (queryVariables.page = page)"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { onBeforeUnmount, onMounted, reactive, ref, watch, computed } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@gql/emotes/search";
import { useI18n } from "vue-i18n";
import { Emote } from "@structures/Emote";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useActorStore } from "@/store/actor";
import { ImageFormat } from "@/structures/Common";
import Button from "@utility/Button.vue";
import EmoteCard from "@utility/EmoteCard.vue";
import PpL from "@components/base/ppL.vue";
import TextInput from "@components/form/TextInput.vue";
import CategorySelector from "./CategorySelector.vue";
import LogoAVIF from "@/components/base/LogoAVIF.vue";
import EmoteListUtilBar from "./EmoteListUtilBar.vue";
import Icon from "@/components/utility/Icon.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import { onClickOutside } from "@vueuse/core";

const { t } = useI18n();

useHead({
	title: "Emote Directory - 7TV",
});

const { preferredFormat } = storeToRefs(useActorStore());

// Form data
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

	const isSmall = window.innerWidth <= 650;

	const marginBuffer = 16; // The margin _in pixels between each card
	const cardSize = isSmall ? 128 : 160; // The size of the cards in pixels
	const width = emotelist.value?.clientWidth; // The width of emotes container
	const height = emotelist.value?.clientHeight; // The height of the emotes container

	const rows = Math.floor(width / (cardSize + marginBuffer)); // The calculated amount of rows
	const columns = Math.floor(height / (cardSize + marginBuffer)); // The calculated amount of columns

	// Return the result of rows multiplied by columns
	return Math.max(1, rows * columns);
};

const router = useRouter();
const route = useRoute();
const initPage = Number(route.query.page) || 1;
const initQuery = route.query.query?.toString() || "";
const initFilter = ((route.query.filter as string) || "").split(",");

const category = ref((route.query.category as string)?.toLowerCase() ?? "TOP");
const queryVariables = reactive({
	query: initQuery,
	limit: Math.max(1, calculateSizedRows()),
	page: initPage,
	filter: {
		category: category.value.toUpperCase(),
		exact_match: initFilter.includes("exact_match"),
		case_sensitive: initFilter.includes("case_sensitive"),
		ignore_tags: initFilter.includes("ignore_tags"),
	},
});

let initResizer = true;
const resizeObserver = new ResizeObserver(() => {
	if (initResizer) {
		initResizer = false;
		return;
	}

	loading.value = true;
	emotes.value = [];
	queryVariables.limit = calculateSizedRows();
});

// Construct the search query
const query = useLazyQuery<SearchEmotes>(SearchEmotes, queryVariables, {
	fetchPolicy: "cache-first",
	debounce: 100,
	errorPolicy: "none",
});

const emotes = ref([] as Emote[]);
const itemCount = ref(0);
const pageCount = computed(() => itemCount.value / queryVariables.limit);

let slowLoad: NodeJS.Timeout;
const slowLoading = ref(false);
const loading = ref(true);
const errored = ref("");
let loadingTimer: NodeJS.Timeout;

watch(query.loading, (v) => {
	unloadImages.value = v;
});

query.onResult((res) => {
	if (loadingTimer) clearTimeout(loadingTimer);
	if (res.loading) {
		loadingTimer = setTimeout(() => {
			loading.value = true;
			if (slowLoad) clearTimeout(slowLoad);
			errored.value = "";
			slowLoading.value = false;
			slowLoad = setTimeout(() => {
				setSpinnerSpeed(2000);
				slowLoading.value = true;
			}, 2500);
			setSpinnerSpeed(500);
		}, 300);
		return;
	}
	if (!res.data) {
		return;
	}

	loading.value = false;
	slowLoading.value = false;
	errored.value = "";
	const items = res.data.emotes.items;
	const cardCount = calculateSizedRows();
	emotes.value = Array(cardCount).fill({ id: null });
	itemCount.value = res.data.emotes.count;
	for (let i = 0; i < cardCount; i++) {
		const item = items[i];
		if (!item) {
			emotes.value.pop();
			continue;
		}
		emotes.value[i] = item;
	}
});

// eslint-disable-next-line no-undef
query.onError((err) => {
	errored.value = err.message;
	emotes.value = [];
	loading.value = false;
});

watch(category, () => {
	queryVariables.filter.category = category.value.toUpperCase();
});

const loadingSpinner = ref<HTMLDivElement | null>(null);
const setSpinnerSpeed = (v: number) =>
	loadingSpinner.value?.style.setProperty("--loading-spinner-speed", v.toFixed(2) + "ms");
onMounted(() => {
	const cardCount = calculateSizedRows();
	queryVariables.limit = Math.max(Math.min(cardCount, 250), 1);

	query.load();
	emotes.value = new Array(cardCount).fill({ id: null });

	document.addEventListener("keyup", handleArrowKeys);

	resizeObserver.observe(emotelist.value as HTMLDivElement);
});

const unloadImages = ref(false);
onBeforeUnmount(() => {
	unloadImages.value = true;

	document.removeEventListener("keyup", handleArrowKeys);
	resizeObserver.disconnect();
});

const searchText = computed(() => queryVariables.query);
const searchFilterMenu = ref(false);
const searchFilterMenuRef = ref<HTMLElement | null>(null);
watch(searchText, () => {
	queryVariables.page = 1;
});

onClickOutside(searchFilterMenuRef, () => {
	searchFilterMenu.value = false;
});

// Handle search change (enter keypress or input blur)
const handleArrowKeys = (ev: KeyboardEvent | FocusEvent) => {
	if ((ev instanceof KeyboardEvent && ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") || query.loading.value) {
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
		(mode === "previousPage" && queryVariables.page === 1) ||
		(mode === "nextPage" && queryVariables.page > pageCount.value) ||
		query.loading.value
	) {
		return;
	}

	if (mode === "nextPage") {
		queryVariables.page++;
	} else if (mode === "previousPage") {
		queryVariables.page--;
	}
};

watch(queryVariables, (_, old) => {
	let act: "push" | "replace" = "push";

	if (old.query.length > 0) {
		act = "replace";
	} else {
		queryVariables.filter.exact_match = false;
		queryVariables.filter.case_sensitive = false;
		queryVariables.filter.ignore_tags = false;
	}

	const filter = Object.keys(queryVariables.filter)
		.filter((k) => k !== "category" && queryVariables.filter[k as keyof typeof queryVariables.filter])
		.join(",");

	router[act]({
		query: {
			page: queryVariables.page,
			query: queryVariables.query || undefined,
			category: category.value !== "TOP" ? category.value.toLowerCase() : undefined,
			filter: filter.length > 0 ? filter : undefined,
		},
	});
});

watch(router.currentRoute, (q) => {
	if (q.name !== "Emotes") {
		return;
	}
	if (q.query.page) {
		queryVariables.page = Number(q.query.page);
	}

	queryVariables.query = q.query.query ? String(q.query.query) : "";
});
</script>

<style lang="scss" scoped>
@import "@scss/emotes.scss";
</style>
