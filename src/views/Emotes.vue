<template>
	<main class="emotes">
		<div class="heading">
			<div class="controls">
				<h3>Search</h3>
				<div class="input-group">
					<input ref="searchBar" class="search-bar" @keydown.stop="onKeyDown" v-model="data.search" required />
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
		</div>
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, onBeforeUnmount, reactive, ref } from "vue";
import Button from "@/components/utility/Button.vue";

export default defineComponent({
	components: {
		Button,
	},
	setup() {
		const searchBar = ref(null);

		const data = reactive({
			search: "",
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
		const issueSearch = () => {
			// console.log(data.search);
		};
		return {
			searchBar,
			issueSearch,
			onKeyDown(e: KeyboardEvent) {
				if (e.key === "Enter") {
					issueSearch();
				}
			},
			data,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/emotes.scss";
</style>
