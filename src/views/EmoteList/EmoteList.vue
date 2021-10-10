<template>
	<main class="emotes">
		<div class="listing">
			<div class="heading-block">
				<h3>Page 1/1</h3>

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

			<!--
				The cards list shows emote cards
			-->
			<div class="cards-list-wrapper">
				<div class="loader" v-if="loading || errored" :class="errored ? 'has-error' : ''">
					<font-awesome-icon :icon="['fas', loading ? 'slash' : 'exclamation']" :pulse="loading" />
					<span class="searching-title" v-if="loading">Searching</span>
					<span class="searching-slow" v-if="loading && slowLoading">
						This is taking a while, service may be degraded
					</span>
					<span class="searching-error" v-if="errored">
						{{ errored }}
					</span>
					<Button v-if="!loading && errored" label="RETRY" color="warning" @click="() => paginate(0)"
						>RETRY</Button
					>
				</div>

				<div class="cards-list" ref="cardList" v-else>
					<EmoteCard :emote="emote" v-for="emote in emotes" :key="emote.id" />
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { SearchEmotes } from "@gql/emotes/search";
import { Emote } from "@structures/Emote";
import { useStore } from "@/store";
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
		const page = ref(0);
		const store = useStore();
		useHead({
			title: "7TV | Emotes",
		});

		// Construct the search query
		const transformEmotes = (data: Emote.Type[]): Emote[] =>
			data.map((e) => {
				store.commit("SET_EMOTE", { id: e.id, data: e });
				return store.getters.emote(e.id);
			});
		const { result, refetch, fetchMore, loading, onError } = useQuery<SearchEmotes>(
			SearchEmotes,
			{
				query,
				pageSize: 150,
			},
			{ errorPolicy: "ignore" }
		);

		watch(result, (value) => {
			// Watch for changes & modify emote list
			emotes.value = [];
			emotes.value.push(...transformEmotes(value?.emotes ?? []));
		});

		// eslint-disable-next-line no-undef
		let slowLoad: number;
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

		/** Paginate: change the current page */
		const paginate = (newPage: number) => {
			loading.value = true;
			fetchMore({
				variables: {
					page: newPage,
				},
			})
				?.then((x) => {
					page.value = newPage;
					emotes.value = transformEmotes(x.data.emotes ?? []);
				})
				.finally(() => (loading.value = false));
		};

		onMounted(() => {
			issueSearch();
			return "";
		});
		return {
			searchBar,
			emotes,
			handleEnter,
			paginate,
			loading,
			slowLoading,
			errored,
			data,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/emotes.scss";
</style>
