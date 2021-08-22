<template>
	<main class="emotes">
		<div class="heading">
			<!--
			<div class="controls">
				<h3>Search</h3>
				<div class="input-group">
					<input ref="searchBar" class="search-bar" @blur="handleEnter" @keydown.stop="handleEnter" v-model="data.searchValue" required />
					<label>Search Emote Name</label>
				</div>
				<div>
					<span>Global Emotes</span>
					<div class="radio-options">
						<div class="input-group-radio">
							<input type="radio" name="global" checked />
							<label>Include</label>
						</div>
						<div class="input-group-radio">
							<input type="radio" name="global" />
							<label>Hide</label>
						</div>
						<div class="input-group-radio">
							<input type="radio" name="global" />
							<label>Only</label>
						</div>
					</div>
				</div>
				<div>
					<span>Sorting</span>
					<div class="radio-options">
						<div class="input-group-radio">
							<input type="radio" name="sort" checked />
							<label>Total Channels</label>
						</div>
						<div class="input-group-radio">
							<input type="radio" name="sort" />
							<label>Date Created</label>
						</div>
					</div>
				</div>
			</div>
			-->
		</div>

		<div class="listing">
			<div class="heading-block">
				<h3>Page 1/1</h3>

				<div class="input-group">
					<input ref="searchBar" class="search-bar" @blur="handleEnter" @keydown.stop="handleEnter" v-model="data.searchValue" required />
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
				<div class="cards-list" ref="cardList">
					<EmoteCard :emote="emote" v-for="emote in emotes" :key="emote.getName()" />
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { DataStructure } from "@typings/typings/DataStructure";
import { SearchEmotes } from "@/assets/gql/emotes/search";
import { Emote } from "@/structures/Emote";
import { useStore } from "@/store";
import Button from "@/components/utility/Button.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";

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

		const keydown = (e: KeyboardEvent) => {
			if (e.key === "/") {
				(searchBar.value as unknown as HTMLInputElement).focus();
				e.preventDefault();
			}
		};
		document.addEventListener("keydown", keydown);
		onBeforeUnmount(() => {
			document.removeEventListener("keydown", keydown);
		});
		useHead({
			title: "7TV | Emotes",
		});

		// Construct the search query
		const transformEmotes = (data: DataStructure.Emote[]): Emote[] =>
			data.map((e) => {
				store.commit("SET_EMOTE", { id: e.id, data: e });
				return store.getters.emote(e.id);
			});
		const { result, refetch, fetchMore } = useQuery<SearchEmotes>(SearchEmotes, {
			query,
			pageSize: 150,
		});
		watch(result, (value) => {
			// Watch for changes & modify emote list
			emotes.value = [];
			emotes.value.push(...transformEmotes(value?.search_emotes ?? []));
		});

		const emotes = ref([] as Emote[]);
		const issueSearch = async () => {
			if (query.value !== data.searchValue) {
				query.value = data.searchValue;
			} else {
				refetch({ query: query.value })?.then((x) => {
					emotes.value = transformEmotes(x.data.search_emotes ?? []);
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

		/** Paginate: change the current page */
		const paginate = (newPage: number) => {
			fetchMore({
				variables: {
					page: newPage,
				},
			})?.then((x) => {
				page.value = newPage;
				emotes.value = transformEmotes(x.data.search_emotes ?? []);
			});
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
			data,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/emotes.scss";
</style>
