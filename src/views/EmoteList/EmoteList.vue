<template>
	<main class="emotes">
		<div class="listing">
			<div class="above-content">
				<div v-if="featuredSetID" class="featured-set">
					<router-link class="unstyled-link" :to="{ name: 'EmoteSet', params: { setID: featuredSetID } }">
						<Icon size="xl" icon="pumpkin" />
						<h3>Featured Halloween Emotes</h3>
					</router-link>
				</div>

				<div class="heading-block">
					<!-- Category Selector -->
					<div class="heading-item category-selector">
						<CategorySelector :initial-value="category" @update="(cat) => (category = cat)" />
					</div>

					<!-- Search Bar -->
					<div class="heading-item search">
						<TextInput v-model="queryVariables.query" :label="t('common.search')" icon="search">
							<template #icon>
								<Icon icon="search" />
							</template>
						</TextInput>

						<div
							v-tooltip="t('emote.list.filters.hint')"
							class="search-filters-button"
							@click="searchFilterMenu = !searchFilterMenu"
						>
							<Icon icon="filter" />
						</div>
						<div v-if="searchFilterMenu" ref="searchFilterMenuRef" class="search-filters">
							<div>
								<Checkbox
									v-model="queryVariables.filter.zero_width"
									:checked="queryVariables.filter.zero_width"
									:label="t('emote.list.filters.zero_width')"
									:style="{ color: 'goldenrod' }"
								/>

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

								<div class="sort">
									<p>{{ t("emote.list.filters.sorting") }}</p>

									<Dropdown
										v-model="sort.value"
										:options="[
											{ id: 'popularity', name: 'Popularity' },
											{ id: 'age', name: 'Date Created' },
										]"
									/>

									<Dropdown
										v-model="sort.order"
										:options="[
											{ id: 'DESCENDING', name: t('emote.list.filters.sorting_descending') },
											{
												id: 'ASCENDING',
												name: t('emote.list.filters.sorting_ascending'),
											},
										]"
									/>
								</div>

								<div class="search-ratio">
									<p>{{ t("emote.list.filters.aspect_ratio") }}</p>
									<p>{{ t("emote.list.filters.aspect_ratio_format") }}</p>
									<div class="ratio-inputs">
										<TextInput
											v-model="aspectRatio.width"
											:label="t('emote.list.filters.aspect_ratio_width')"
										/>
										<TextInput
											v-model="aspectRatio.height"
											:label="t('emote.list.filters.aspect_ratio_height')"
										/>
										<TextInput
											v-model="aspectRatio.tolerance"
											:label="t('emote.list.filters.aspect_ratio_tolerance')"
										/>
									</div>
								</div>
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
					<span> {{ t("emote.list.emote_count", [itemCount], { plural: itemCount }) }} </span>
				</div>
				<div class="down-edge" />
			</div>

			<div class="emote-page" @keypress.left="paginate('previousPage')">
				<!-- The cards list shows emote cards -->
				<div ref="emotelist" class="cards-list-wrapper">
					<div :class="{ loading }" class="cards-list">
						<EmoteCardList :items="emotes" :unload="unloadImages" />
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
import { onBeforeUnmount, onMounted, reactive, ref, watch, computed, nextTick } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@gql/emotes/search";
import { useI18n } from "vue-i18n";
import { Emote } from "@/structures/Emote";
import { useRoute, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import Button from "@utility/Button.vue";
import PpL from "@/components/base/ppL.vue";
import TextInput from "@/components/form/TextInput.vue";
import CategorySelector from "./CategorySelector.vue";
import EmoteListUtilBar from "./EmoteListUtilBar.vue";
import Icon from "@/components/utility/Icon.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import EmoteCardList from "@/components/utility/EmoteCardList.vue";
import { useSizedRows } from "@/composable/calculate-sized-rows";
import Dropdown from "@/components/form/Dropdown.vue";

const { t } = useI18n();

useHead({
	title: "Emote Directory - 7TV",
});

// Form data
const emotelist = ref<HTMLElement | null>(null);

const router = useRouter();
const route = useRoute();
const initPage = Number(route.query.page) || 1;
const initQuery = route.query.query?.toString() || "";
const initFilter = ((route.query.filter as string) || "").split(",");

const { update: updateSizing } = useSizedRows([128, 160]);
const getSizedRows = (): number => (emotelist.value ? updateSizing(emotelist.value).sum : 0);

const category = ref((route.query.category as string)?.toLowerCase() ?? "TOP");

// Aspect Ratio Search
const aspectRatio = reactive({
	used: false,
	width: 1,
	height: 1,
	tolerance: 10,
});
if (route.query.aspect_ratio) {
	const [width, height, tolerance] = (route.query.aspect_ratio as string).split(":");
	aspectRatio.width = Number(width);
	aspectRatio.height = Number(height);
	aspectRatio.tolerance = Number(tolerance);
}

const computedRatio = computed(() =>
	aspectRatio.used ? `${aspectRatio.width}:${aspectRatio.height}:${aspectRatio.tolerance}` : "",
);

watch(aspectRatio, (v) => {
	if (v.width === 1 && v.height === 0 && v.tolerance === 0) {
		aspectRatio.used = false;
		return;
	}

	v.used = true;

	queryVariables.filter.aspect_ratio = computedRatio.value;
});

// Sort
const sort = reactive({
	used: false,
	value: "popularity",
	order: "DESCENDING",
});
if (route.query.sort) {
	const [name, order] = (route.query.sort as string).split(":");

	sort.value = name;
	sort.order = order?.toUpperCase();
}

const computedSort = computed(() => (sort.used ? `${sort.value}:${sort.order.toLowerCase()}` : ""));

watch(sort, (v) => {
	v.used = v.value === "popularity" && v.order === "DESCENDING";

	queryVariables.sort = { value: v.value, order: v.order };
});

const queryVariables = reactive({
	query: initQuery,
	limit: Math.max(1, getSizedRows()),
	page: initPage,
	sort: {
		value: sort.value,
		order: sort.order,
	},
	filter: {
		category: category.value.toUpperCase(),
		exact_match: initFilter.includes("exact_match"),
		case_sensitive: initFilter.includes("case_sensitive"),
		ignore_tags: initFilter.includes("ignore_tags"),
		zero_width: initFilter.includes("zero_width"),
		aspect_ratio: computedRatio.value,
	},
});

let initResizer = true;
const resizeObserver = new ResizeObserver(() => {
	if (initResizer) {
		initResizer = false;
		return;
	}

	const currentLimit = queryVariables.limit;

	queryVariables.limit = getSizedRows();

	nextTick(() => {
		if (currentLimit !== queryVariables.limit) {
			loading.value = true;
			emotes.value = [];
			query.refetch(queryVariables);
		}
	});
});

// Construct the search query
const query = useLazyQuery<SearchEmotes>(SearchEmotes, queryVariables, {
	fetchPolicy: "cache-first",
	debounce: 180,
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

const unloadImages = ref(false);
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
	const cardCount = getSizedRows();
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
	const cardCount = getSizedRows();
	queryVariables.limit = Math.max(Math.min(cardCount, 250), 1);

	query.load();
	emotes.value = new Array(cardCount).fill({ id: null });

	document.addEventListener("keyup", handleArrowKeys);

	resizeObserver.observe(emotelist.value as HTMLDivElement);
});

onBeforeUnmount(() => {
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
		.filter(
			(k) =>
				!["category", "aspect_ratio"].includes(k) &&
				queryVariables.filter[k as keyof typeof queryVariables.filter],
		)
		.join(",");

	router[act]({
		query: {
			page: queryVariables.page,
			query: queryVariables.query || undefined,
			sort: computedSort.value || undefined,
			category: category.value !== "TOP" ? category.value.toLowerCase() : undefined,
			aspect_ratio: computedRatio.value || undefined,
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

const featuredSetID = import.meta.env.VITE_APP_FEATURED_SET_ID;
</script>

<style lang="scss" scoped>
@import "@scss/emotes.scss";
</style>
