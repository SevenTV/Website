<template>
	<main class="emote-page">
		<template v-if="partial || !loading">
			<!-- Heading Bar | Emote Title / Author -->
			<div class="heading-bar">
				<div class="emote-name">
					<div class="tiny-preview">
						<img :src="emote?.links?.[0][1]" />
					</div>

					<div>{{ emote?.name }}</div>
				</div>

				<div class="emote-author" v-if="emote?.owner">
					<span>Author</span>
					<UserTag scale="1em" :user="emote?.owner"></UserTag>
				</div>
			</div>

			<!-- Preview Block | Sizes display -->
			<div class="preview-block" v-if="preview.loaded">
				<div class="preview-size" :v-bind="index" :key="size[1]" v-for="(size, index) in linkMap">
					<img :style="{ width: `${emote?.width?.[index] ?? 32}px` }" :src="size[1]" />
				</div>
			</div>
			<div class="preview-block is-loading" v-else>
				Loading previews... ({{ preview.count }}/{{ linkMap.size }})
			</div>

			<!-- Versions -->
			<div class="versioning-block">
				<span class="block-title">Versions</span>

				<div class="is-content-block">xd</div>
			</div>

			<!-- Channels -->
		</template>
		<template v-else-if="!partial">Loading...</template>
	</main>
</template>

<script lang="ts">
import { Emote } from "@/structures/Emote";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent, ref } from "vue";
import { GetOneEmote } from "@/assets/gql/emotes/get-one";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: {
		UserTag,
	},
	props: {
		emoteID: String,
		emoteData: {
			required: false,
			type: String,
		},
	},
	setup(props) {
		const emote = ref((props.emoteData ? JSON.parse(props.emoteData) : null) as Emote | null);
		/** Whether or not the page was initiated with partial emote data  */
		const partial = emote.value !== null;

		const { onResult, loading } = useQuery<GetOneEmote>(GetOneEmote, { id: props.emoteID });
		onResult((res) => {
			emote.value = res.data.emote;

			defineLinks(emote.value.links);
		});

		// Preload preview images
		const linkMap = ref(new Map<string, string | undefined>(emote.value?.links));
		const preview = ref({
			loaded: false,
			count: 0,
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

		return {
			emote,
			link: {} as string[],
			linkMap,
			partial,
			loading,
			preview,
		};
	},
});
</script>

<style lang="scss">
@import "@scss/emote-page.scss";
</style>
