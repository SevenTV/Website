/* eslint-disable no-console */
<template>
	<main class="emotes">
		<div class="heading">
			<div class="controls">
				<h3>Search</h3>
				<div class="input-group">
					<input ref="searchBar" class="search-bar" @keydown.stop="(ev) => handleEnter(ev)" v-model="data.query" required />
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
		</div>

		<div class="listing">
			<div class="heading-block">
				<h3>Page 1/1</h3>
				<div class="physical-separator"></div>
			</div>

			<!--
				The heading block is the primary heading, siting atop of the content area
				It displays pagination information
			-->
			<div class="create-button-wrapper">
				<div class="create-button">
					<Button fa-icon="plus" label="ADD EMOTE" color="primary" to="/emotes/create" />
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
					<EmoteCard :emote="emote" v-for="emote in emotes" :key="emote.name" />
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { DataStructure } from "@typings/typings/DataStructure";
import Button from "@/components/utility/Button.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";

export default defineComponent({
	components: {
		Button,
		EmoteCard,
	},

	setup() {
		const searchBar = ref(null);

		const data = reactive({
			query: "",
		});

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

		const { result, loading } = useQuery<{ search_emotes: DataStructure.Emote[]; total_estimated_size: number }>(
			gql`
				query SearchEmotes($query: String!) {
					search_emotes(query: $query) {
						id
						visibility
						owner {
							id
							display_name
							role {
								id
								name
								color
							}
						}
						name
					}
				}
			`,
			data
		);

		const emotes = ref([] as DataStructure.Emote[]);
		const issueSearch = async () => {
			const emoteResult = useResult(result, [], (data) => data?.search_emotes);
			watch(
				loading,
				() => {
					// eslint-disable-next-line no-console
					console.log("okayge", emoteResult.value);
					if (!emoteResult.value || emoteResult.value?.length === 0) {
						// eslint-disable-next-line no-console
						return console.log("no emotes");
					}

					emotes.value = [];
					emotes.value.push(...emoteResult.value);
				},
				{ deep: true }
			);
		};

		const handleEnter = (ev: KeyboardEvent) => {
			if (ev.key === "Enter") {
				issueSearch();
			}
		};

		onMounted(issueSearch);
		return {
			searchBar,
			emotes,
			handleEnter,
			data,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/emotes.scss";
</style>
