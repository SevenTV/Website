<template>
	<main class="emote-page">
		<template v-if="partial || (emote && !loading)">
			<!-- Heading Bar | Emote Title / Author -->
			<section class="heading-bar">
				<div class="emote-name">
					<div v-if="emote && preview.loaded" class="tiny-preview">
						<img :src="GetUrl(emote, '1x') + '.webp'" />
					</div>

					<div>{{ emote?.name }}</div>
				</div>

				<div v-if="emote?.owner" class="emote-author">
					<div>{{ $t("emote.author") }}</div>
					<UserTag scale="1em" text-scale="0.8rem" :user="emote?.owner" :clickable="true"></UserTag>
				</div>
			</section>

			<!-- Preview Block | Sizes display -->
			<section v-if="linkMap && !isProcessing && preview.loaded" class="preview-block">
				<div class="formats">
					<div
						class="format-opt"
						:class="{ selected: selectedFormat === 'webp' }"
						@click="() => toggleFormat('webp')"
					>
						WEBP
					</div>
					<div
						class="format-opt"
						:class="{ selected: selectedFormat === 'avif' }"
						@click="() => toggleFormat('avif')"
					>
						AVIF
					</div>
					<div
						v-if="emote?.animated"
						class="format-opt"
						:class="{ selected: selectedFormat === 'gif' }"
						@click="() => toggleFormat('gif')"
					>
						GIF
					</div>
					<div
						v-else
						class="format-opt"
						:class="{ selected: selectedFormat === 'png' }"
						@click="() => toggleFormat('png')"
					>
						PNG
					</div>
				</div>
				<div v-if="selectedFormat === 'avif' && emote?.animated" class="chrome-bug">
					<p>Currently due to a bug AVIF Animated Emotes are not supported by chrome.</p>
					<p>
						Please click the link below to star our bug report so that this can be fixed as soon as
						possible.
					</p>
					<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1274200"
						>https://bugs.chromium.org/p/chromium/issues/detail?id=1274200</a
					>
				</div>
				<template v-else>
					<div
						v-for="(url, index) in linkMap"
						:key="url[0]"
						class="preview-size"
						:class="{ 'is-large': index >= 3 }"
					>
						<img :src="url[1]" />
					</div>
				</template>
			</section>
			<section v-else-if="isProcessing" class="preview-block is-loading">
				<span class="emote-is-processing">Processing Emote - this may take some time.</span>
			</section>
			<section v-else-if="preview.errors < 4" class="preview-block is-loading">
				Loading previews... ({{ preview.count + 1 }}/{{ linkMap?.size }})
			</section>
			<section v-else class="preview-block is-loading">
				<span :style="{ color: 'red' }">Failed to load preview</span>
			</section>

			<!-- Interactions: Actions, Versions & Comments -->
			<div class="interactive-block">
				<div class="actions-wrapper">
					<div class="emote-interactions">
						<EmoteInteractions :emote="emote" :is-channel-emote="isChannelEmote" />
					</div>
				</div>

				<div v-if="!headingOnly" class="versioning item">
					<span class="block-title"> {{ $t("emote.versions") }} </span>

					<div class="is-content-block">
						<EmoteVersion />
					</div>
				</div>
				<div v-if="!headingOnly" class="comments item">
					<span class="block-title"> {{ $t("emote.comments") }} </span>
					<EmoteComment class="is-content-block"></EmoteComment>
				</div>
			</div>

			<!-- Channels -->
			<div v-if="!headingOnly" class="channels-list">
				<span class="block-title"> {{ $t("emote.channels") }} </span>
				<div class="is-content-block">TODO</div>
			</div>
		</template>
		<template v-else-if="loading">Loading...</template>
		<template v-else>
			<div class="emote-unknown">
				<NotFoundPage />
			</div>
		</template>
	</main>
</template>

<script lang="ts">
import { Emote, GetUrl, Status } from "@/structures/Emote";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, onUnmounted, ref } from "vue";
import { GetOneEmote } from "@/assets/gql/emotes/get-one";
import { User, UserHasEmote } from "@/structures/User";
import { useStore } from "@/store";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteComment from "./EmoteComment.vue";
import NotFoundPage from "../404.vue";
import EmoteInteractions from "./EmoteInteractions.vue";
import EmoteVersion from "./EmoteVersion.vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
	components: {
		UserTag,
		EmoteComment,
		NotFoundPage,
		EmoteInteractions,
		EmoteVersion,
	},
	props: {
		emoteID: String,
		emoteData: {
			required: false,
			type: String,
		},
		headingOnly: Boolean,
	},
	setup(props) {
		const store = useStore();
		const clientUser = computed(() => store.getters.clientUser as User);
		const emote = ref((props.emoteData ? JSON.parse(props.emoteData) : null) as Emote | null);
		const title = computed(() =>
			"".concat(
				emote.value !== null ? emote.value.name : "Emote",
				emote.value?.owner ? ` by ${emote.value.owner.display_name}` : "",
				" - 7TV"
			)
		);
		useHead({ title });

		/** Whether or not the client user has this emote enabled */
		const isChannelEmote = computed(() => UserHasEmote(clientUser.value, emote.value?.id));
		const isProcessing = computed(
			() => emote.value?.status === Status.PENDING || emote.value?.status === Status.PROCESSING
		);
		/** Whether or not the page was initiated with partial emote data  */
		const partial = emote.value !== null;

		const { onResult, loading, stop, refetch } = useQuery<GetOneEmote>(GetOneEmote, { id: props.emoteID });
		onResult((res) => {
			if (!res.data) {
				return;
			}
			emote.value = res.data.emote;
			defineLinks("webp");

			// Handle emote in processing state
			// Poll for the emote to become available
			if (emote.value.status !== Status.LIVE) {
				const i = setInterval(() => {
					if (!emote.value) {
						clearInterval(i);
						return;
					}
					refetch()?.then((r) => (r.data.emote.status === Status.LIVE ? clearInterval(i) : null));
				}, 1500); // TODO: use the EventAPI to do this, instead of polling
			}
		});

		// Format selection
		const selectedFormat = ref<"webp" | "avif" | "png" | "gif">("webp");
		const toggleFormat = (format: "webp" | "avif" | "png" | "gif") => {
			selectedFormat.value = format;
		};

		// Preload preview images
		const linkMap = ref<Map<string, string | undefined>>(new Map());
		const preview = ref({
			loaded: false,
			count: 0,
			errors: 0,
			images: new Set<HTMLImageElement>(),
		});
		const defineLinks = (format: string) => {
			let loaded = 0;

			linkMap.value = new Map<string, string | undefined>(
				emote.value?.urls.map((v, i) => [i.toString(), v] as [string, string])
			);
			for (const [label, link] of linkMap.value) {
				const w = emote.value?.width?.[0];
				const h = emote.value?.height?.[0];
				const img = new Image(w, h);
				preview.value.images.add(img);
				img.src = `http:${link}.${format}`;

				const listener: (this: HTMLImageElement, ev: Event) => void = function () {
					loaded++;
					preview.value.count = loaded;

					linkMap.value.set(label, this.src);
					if (loaded >= linkMap.value.size) {
						preview.value.loaded = true;
						img.removeEventListener("load", listener);
					}
				};
				img.addEventListener("load", listener);
				img.onerror = () => {
					preview.value.errors++;
				};
			}
		};
		if (partial) {
			defineLinks("webp");
		}

		onUnmounted(() => {
			// Halt query
			stop();

			emote.value = null;
		});

		return {
			emote,
			partial,
			loading,
			preview,
			toggleFormat,
			GetUrl,
			linkMap,
			selectedFormat,
			clientUser,
			isChannelEmote,
			isProcessing,
		};
	},
});
</script>

<style lang="scss">
@import "@scss//emote-page/emote-page.scss";
</style>
