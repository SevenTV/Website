<template>
	<main class="emote-set-page">
		<div class="emote-set-wrapper">
			<div selector="heading">
				<span v-if="set && set.owner" selector="set-owner">
					<p>Managed by</p>
					<UserTag :user="set.owner" scale="1em" :clickable="true" />
				</span>
				<span> {{ set?.name }} </span>
				<span></span>
			</div>

			<!-- Content -->
			<div selector="content">
				<div v-if="set" selector="card-list">
					<div
						v-for="ae of set.emotes"
						:key="ae.id"
						:ref="(el) => setCardRef(el as HTMLElement)"
						selector="card-wrapper"
						:emote-id="ae.id"
					>
						<EmoteCard v-if="loaded.has(ae.id)" :emote="ae.emote" :spooky="theme === 'halloween'" />
						<div v-else selector="card-placeholder"></div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { GetEmoteSet } from "@gql/emote-set/emote-set";
import { EmoteSet } from "@structures/EmoteSet";
import { useQuery } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";

const props = defineProps<{
	setID: string;
	setData?: string;
}>();

const { theme } = storeToRefs(useStore());
const set = ref<EmoteSet>(props.setData ? JSON.parse(props.setData) : null);
const { onResult } = useQuery<GetEmoteSet>(GetEmoteSet, { id: props.setID });
onResult((res) => {
	if (!res.data?.emoteSet) {
		return;
	}
	set.value = res.data.emoteSet;
});

// Set page title
const title = computed(() => `${set.value?.name ?? "Emote Set"} - 7TV`);
useHead({ title });

// Lazy Loading
// Intersection Observer
const loaded = ref(new Set<string>());
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		const id = entry.target.getAttribute("emote-id");
		if (!id) {
			return; // skip if element didn't contain an emote id attribute
		}

		if (entry.isIntersecting) {
			loaded.value.add(id); // add the element to currently viewed
			observer.unobserve(entry.target);
		}
	});
});

// gather all card elements and observe them
const setCardRef = (el: HTMLElement) => {
	if (el instanceof Element) {
		observer.observe(el);
	}
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

main.emote-set-page {
	display: flex;
	align-items: center;
	justify-content: center;

	@include themify() {
		background-color: themed("navBackgroundColor");
		> div {
			background-color: themed("backgroundColor");
			> div[selector="heading"] {
				height: 3em;
				background-color: lighten(themed("backgroundColor"), 2);
				background-image: linear-gradient(145deg, themed("navBackgroundColor") 16vw, transparent 0),
					linear-gradient(-145deg, themed("navBackgroundColor") 16vw, transparent 0);

				@media screen and (max-width: 800px) {
					background-image: none;
				}
			}

			> div[selector="content"] {
				div[selector="card-placeholder"] {
					background-color: darken(themed("backgroundColor"), 2);
				}
			}
		}
	}
	> div {
		display: flex;
		flex-direction: column;
		width: calc(100% - 2.5em);
		height: calc(100% - 2.5em);

		$contentHeight: 3em;

		clip-path: polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%);

		@media screen and (max-width: 600px) {
			clip-path: none;
		}

		> div[selector="heading"] {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: $contentHeight;

			> span {
				width: 33%;
				font-size: 1.05em;
				text-align: center;

				&[selector="set-owner"] {
					font-size: 0.88em;

					> p {
						letter-spacing: 0.1em;
						font-weight: 300;
					}
				}
			}
		}

		> div[selector="content"] {
			height: calc(100% - $contentHeight);
			padding: 3.5vh;
			margin-left: 3vh;
			margin-right: 3vh;
			display: flex;
			flex-direction: column;

			> div[selector="card-list"] {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 1em;

				> div[selector="card-wrapper"] > div[selector="card-placeholder"] {
					height: 160px;
					width: 160px;
					margin: 0.5em;
				}
			}
		}
	}
}
</style>
