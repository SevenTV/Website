<template>
	<main class="emote-page">
		<template v-if="partial || (emote && !loading)">
			<!-- Heading Bar | Emote Title / Author -->
			<section class="heading-bar">
				<div class="emote-name">
					<div class="tiny-preview" v-if="preview.loaded">
						<img :src="emote?.links?.[0][1]" />
					</div>

					<div>{{ emote?.name }}</div>
				</div>

				<div class="emote-author" v-if="emote?.owner">
					<div>Author</div>
					<UserTag scale="1em" text-scale="0.8rem" :user="emote?.owner"></UserTag>
				</div>
			</section>

			<!-- Preview Block | Sizes display -->
			<section class="preview-block" v-if="preview.loaded">
				<div class="format-toggle">
					<div class="formats" v-on:click="() => toggleFormat()">
						<div class="webp-side format-opt" :class="{ selected: selectedFormat === 'WEBP' }">WEBP</div>
						<div
							class="avif-side format-opt"
							:class="{ unavailable: !emote?.avif, selected: selectedFormat === 'AVIF' }"
						>
							AVIF
						</div>
					</div>
				</div>

				<div
					class="preview-size"
					v-for="(size, index) in linkMap"
					:v-bind="index"
					:key="size[1]"
					:class="{ 'is-large': size[0] === '4' }"
				>
					<img :style="{ width: `${emote?.width?.[index] ?? 32}px` }" :src="size[1]" />
				</div>
			</section>
			<section class="preview-block is-loading" v-else>
				Loading previews... ({{ preview.count }}/{{ linkMap.size }})
			</section>

			<!-- Interactions: Actions, Versions & Comments -->
			<div class="interactive-block">
				<div class="actions-wrapper">
					<div class="emote-interactions" :bind="clientUser">
						<EmoteInteractions :emote="emote" :is-channel-emote="isChannelEmote"></EmoteInteractions>
					</div>
				</div>

				<div class="versioning item">
					<span class="block-title">Versions</span>

					<div class="is-content-block">TODO</div>
				</div>
				<div class="comments item">
					<span class="block-title">Comments</span>
					<EmoteComment class="is-content-block"></EmoteComment>
				</div>
			</div>

			<!-- Channels -->
			<div class="channels-lis">
				<span class="block-title">Channels</span>
				<div class="is-content-block">TODO</div>
			</div>
		</template>
		<template v-else-if="loading">Loading...</template>
		<template v-else>
			<div class="emote-unknown">
				<NotFoundPage></NotFoundPage>
			</div>
		</template>
	</main>
</template>

<script lang="ts">
import { Emote } from "@/structures/Emote";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, onUnmounted, ref } from "vue";
import { GetOneEmote } from "@/assets/gql/emotes/get-one";
import { User, UserHasEmote } from "@/structures/User";
import { useStore } from "@/store";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteComment from "./EmoteComment.vue";
import NotFoundPage from "../404.vue";
import EmoteInteractions from "./EmoteInteractions.vue";

export default defineComponent({
	components: {
		UserTag,
		EmoteComment,
		NotFoundPage,
		EmoteInteractions,
	},
	props: {
		emoteID: String,
		emoteData: {
			required: false,
			type: String,
		},
	},
	setup(props) {
		const store = useStore();
		const clientUser = computed(() => store.getters.clientUser as User);
		const emote = ref((props.emoteData ? JSON.parse(props.emoteData) : null) as Emote | null);

		/** Whether or not the client user has this emote enabled */
		const isChannelEmote = computed(() => UserHasEmote(clientUser.value, emote.value?.id));
		/** Whether or not the page was initiated with partial emote data  */
		const partial = emote.value !== null;

		const { onResult, loading, stop } = useQuery<GetOneEmote>(GetOneEmote, { id: props.emoteID });
		onResult((res) => {
			if (!res.data) {
				return;
			}
			emote.value = res.data.emote;
			if (emote.value.avif) {
				selectedFormat.value = "AVIF";
			}

			defineLinks(emote.value.links);
		});

		// Preload preview images
		const linkMap = ref(new Map<string, string | undefined>(emote.value?.links));
		const preview = ref({
			loaded: false,
			count: 0,
			images: new Set<HTMLImageElement>(),
		});
		const defineLinks = (links: string[][] | undefined) => {
			if (!Array.isArray(links)) {
				return undefined;
			}

			let loaded = 0;
			for (const [label, link] of links) {
				const w = emote.value?.width?.[0];
				const h = emote.value?.height?.[0];
				const img = new Image(w, h);
				preview.value.images.add(img);

				img.src = link;
				const listener: (this: HTMLImageElement, ev: Event) => unknown = function () {
					loaded++;
					preview.value.count = loaded;

					linkMap.value.set(label, this.src);
					if (loaded >= links.length) {
						preview.value.loaded = true;
						img.removeEventListener("load", listener);
					}
				};
				img.addEventListener("load", listener);
			}
		};
		if (partial) {
			defineLinks(emote.value?.links);
		}

		// Format selection
		const selectedFormat = ref<"WEBP" | "AVIF">("WEBP");
		const toggleFormat = () => {
			switch (selectedFormat.value) {
				case "WEBP":
					if (!emote.value?.avif) {
						return undefined;
					}
					selectedFormat.value = "AVIF";
					break;
				case "AVIF":
					selectedFormat.value = "WEBP";
					break;
			}
		};

		onUnmounted(() => {
			// Halt query
			stop();
			// Remove images (stop them from downloading if they were)
			for (const img of preview.value.images) {
				img.src = "";
			}
		});

		return {
			emote: emote as unknown as Emote,
			link: {} as string[],
			linkMap,
			partial,
			loading,
			preview,
			toggleFormat,
			selectedFormat,
			clientUser,
			isChannelEmote,
		};
	},
});
</script>

<style lang="scss">
@import "@scss/emote-page.scss";
</style>
