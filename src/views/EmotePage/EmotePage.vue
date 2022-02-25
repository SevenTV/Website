<template>
	<main class="emote-page">
		<template v-if="partial || (emote && !loading)">
			<!-- Heading Bar | Emote Title / Author -->
			<section class="heading-bar">
				<div v-if="emote?.owner" class="emote-author">
					<span>{{ t("emote.author") }}</span>
					<UserTag scale="1.5em" text-scale="1.3rem" :user="emote?.owner" :clickable="true" />
				</div>
				<div v-if="emote" class="emote-name">
					<p>{{ emote.name }}</p>
					<span v-if="actor.defaultEmoteSetID && customName && customName !== emote.name" class="set-renamed">
						as {{ customName }}
					</span>
				</div>
				<!--
				<div class="creation-date">
					<p>{{ t("emote.created_at") }}</p>
					<span> {{ createdAt }} </span>
				</div>
				-->

				<div class="format-selector-outer">
					<div class="format-selector">
						<LogoWEBP
							:selected="selectedFormat === Common.Image.Format.WEBP"
							class="format-button"
							@click="selectedFormat = Common.Image.Format.WEBP"
						/>
						<LogoAVIF
							:selected="selectedFormat === Common.Image.Format.AVIF"
							class="format-button"
							@click="selectedFormat = Common.Image.Format.AVIF"
						/>
					</div>
				</div>
			</section>

			<!-- Preview Block | Sizes display -->
			<section v-if="preview.images.size > 0 && !isProcessing && preview.loaded" class="preview-block">
				<div
					v-for="(im, index) in preview.images"
					:key="im.getAttribute('filename') ?? ''"
					class="preview-size"
					:class="{ 'is-large': index >= 3 }"
				>
					<img :src="im.src" />
				</div>
			</section>
			<section v-else-if="isProcessing" class="preview-block is-loading">
				<span class="emote-is-processing">Processing Emote - this may take some time.</span>
			</section>
			<section v-else-if="preview.errors < 4" class="preview-block is-loading">
				Loading previews... ({{ preview.count + 1 }}/{{ preview.images?.size }})
			</section>
			<section v-else class="preview-block is-loading">
				<span :style="{ color: 'red' }">Failed to load preview</span>
			</section>

			<!-- Interactions: Actions, Versions & Comments -->
			<section class="interactive-block">
				<div class="emote-interactions">
					<EmoteInteractions :emote="emote" />
				</div>
			</section>

			<div class="level-separation" />
			<section class="informative-block">
				<div section="versioning">
					<div class="section-head">
						<h3>Versions</h3>
					</div>
					<div class="section-content">TODO</div>
				</div>

				<div v-if="channels" section="channels">
					<div class="section-head">
						<h3>Channels ({{ channels.total }})</h3>
					</div>
					<div class="section-content">
						<div v-for="u in channels?.items" :key="u.id" class="channel-card-wrapper" :ok="!!u.id">
							<router-link
								:to="
									u.id ? { name: 'User', params: { userID: u.id, userData: JSON.stringify(u) } } : ''
								"
								class="unstyled-link"
								draggable="false"
							>
								<div
									v-wave
									class="channel-card"
									:style="{
										backgroundColor: u.tag_color ? ConvertIntColorToHex(u.tag_color, 0.075) : '',
									}"
								>
									<div class="user-picture">
										<UserTag :user="u" text-scale="0" scale="2.75em" />
									</div>
									<span class="nametag-only">
										<UserTag :user="u" text-scale="0.85em" :hide-avatar="true" />
									</span>
								</div>
							</router-link>
						</div>
					</div>
				</div>

				<div section="comments">
					<div class="section-head">
						<h3>Comments</h3>
					</div>
					<div class="section-content">
						<div class="comment-list">
							<EmoteComment />
						</div>
					</div>
				</div>
			</section>
		</template>
		<template v-else-if="loading">Loading...</template>
		<template v-else>
			<div class="emote-unknown">
				<NotFoundPage />
			</div>
		</template>
	</main>
</template>

<script setup lang="ts">
import { Emote } from "@/structures/Emote";
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { computed, defineProps, onUnmounted, ref, watch } from "vue";
import { GetEmoteChannels, GetEmote, WatchEmote } from "@/assets/gql/emotes/emote";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { Common } from "@/structures/Common";
import { ApplyMutation } from "@/structures/Update";
import { useActorStore } from "@/store/actor";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import UserTag from "@/components/utility/UserTag.vue";
import NotFoundPage from "../404.vue";
import EmoteInteractions from "./EmoteInteractions.vue";
// import formatDate from "date-fns/fp/format";
import EmoteComment from "./EmoteComment.vue";
import LogoAVIF from "@/components/base/LogoAVIF.vue";
import LogoWEBP from "@/components/base/LogoWEBP.vue";

const props = defineProps({
	emoteID: String,
	emoteData: {
		required: false,
		type: String,
	},
	headingOnly: Boolean,
});

const { t } = useI18n();
const actor = useActorStore();
const emote = ref((props.emoteData ? JSON.parse(props.emoteData) : null) as Emote | null);
const title = computed(() =>
	"".concat(
		emote.value !== null ? emote.value.name : "Emote",
		emote.value?.owner ? ` by ${emote.value.owner.display_name}` : "",
		" - 7TV"
	)
);
useHead({ title });

const isProcessing = computed(
	() => emote.value?.lifecycle === Emote.Lifecycle.PENDING || emote.value?.lifecycle === Emote.Lifecycle.PROCESSING
);
/** Whether or not the page was initiated with partial emote data  */
const partial = emote.value !== null;

// Fetch emote
const { onResult, loading, stop } = useQuery<GetEmote>(GetEmote, { id: props.emoteID });
onResult((res) => {
	if (!res.data) {
		return;
	}
	emote.value = res.data.emote;
	defineLinks(Common.Image.Format.WEBP);
});

// Watch emote
const { onResult: onEmoteUpdate } = useSubscription<GetEmote>(WatchEmote, { id: props.emoteID });
onEmoteUpdate((res) => {
	if (!res.data || !emote.value) {
		return;
	}

	for (const k of Object.keys(res.data.emote)) {
		ApplyMutation(emote.value, {
			action: "set",
			field: k,
			value: JSON.stringify(res.data.emote[k as keyof Emote]),
		});
	}
});

// Fetch channels
const { result: getChannels } = useQuery<GetEmote>(GetEmoteChannels, {
	id: props.emoteID,
	page: 1,
	limit: 50,
});
const channels = computed<Emote.UserList>(
	() =>
		(preview.value.loaded ? getChannels.value?.emote.channels : null) ?? {
			total: 0,
			items: Array(50).fill({ id: null }),
		}
);

// Format selection
const selectedFormat = ref<Common.Image.Format>(Common.Image.Format.WEBP);

// Preload preview images
const preview = ref({
	loaded: false,
	count: 0,
	errors: 0,
	images: new Set<HTMLImageElement>(),
});
const defineLinks = (format: Common.Image.Format) => {
	let loaded = 0;

	preview.value.images.clear();
	preview.value.count = 0;
	preview.value.errors = 0;

	const imgs = emote.value?.images.filter((im) => im.format === format) ?? [];
	if (imgs.length < 4) {
		preview.value.errors = 4;
	}
	for (const im of imgs) {
		const w = im.width;
		const h = im.height;
		const img = new Image(w, h);
		preview.value.images.add(img);
		img.src = im.url;
		img.setAttribute("filename", im.name);

		const listener: (this: HTMLImageElement, ev: Event) => void = function () {
			loaded++;
			preview.value.count = loaded;

			if (loaded >= 4) {
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
	defineLinks(Common.Image.Format.WEBP);
}
watch(selectedFormat, (format) => defineLinks(format));

onUnmounted(() => {
	// Halt query
	stop();

	emote.value = null;
});

// const hasEmote = computed(() => (emote.value ? store.activeEmotes.includes(emote.value?.id) : false));
// const createdAt = computed(() => formatDate("MMMM d, y")(new Date(emote.value?.created_at ?? 0)));
const customName = computed(() =>
	actor.defaultEmoteSetID && emote.value
		? actor.getActiveEmoteInSet(actor.defaultEmoteSetID, emote.value?.id)?.name ?? ""
		: ""
);
</script>

<style lang="scss">
@import "@scss/emote-page/emote-page.scss";
</style>
