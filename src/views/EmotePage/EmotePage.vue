<template>
	<main ref="page" class="emote-page">
		<template v-if="loading || ignoreError || !error">
			<!-- Heading Bar | Emote Title / Author -->
			<section class="heading-bar">
				<div class="emote-author">
					<p>{{ t("emote.author") }}</p>
					<UserTag scale="1.5em" text-scale="1.3rem" :user="emote?.owner" :clickable="true" />
				</div>
				<div v-if="emote" class="emote-name">
					<p>{{ emote.name }}</p>
					<span v-if="actor.defaultEmoteSetID && customName && customName !== emote.name" class="set-renamed">
						as {{ customName }}
					</span>

					<!-- Trending state? -->
					<span v-if="emote.trending" :style="{ color: '#ff9632' }">
						<font-awesome-icon :icon="['far', 'fire']" />
						{{ t("emote.trending_rank", [emote.trending]) }}
					</span>
				</div>

				<div class="format-selector-outer">
					<div class="format-selector">
						<LogoWEBP
							:selected="selectedFormat === ImageFormat.WEBP"
							class="format-button"
							@click="selectedFormat = ImageFormat.WEBP"
						/>
						<LogoAVIF
							:selected="selectedFormat === ImageFormat.AVIF"
							class="format-button"
							@click="selectedFormat = ImageFormat.AVIF"
						/>
					</div>
				</div>
			</section>

			<!-- Preview Block | Sizes display -->
			<section v-if="!visible" class="preview-block in-unlisted-state">
				<h2 :style="{ color: 'rgb(255, 60, 60)' }">
					<font-awesome-icon :icon="['far', 'warning']" />
					{{ t("emote.unlisted.heading").toUpperCase() }}
				</h2>

				<p>
					{{ t("emote.unlisted.warning") }}
				</p>
				<p>{{ t("emote.unlisted.notice") }}</p>
			</section>
			<section v-else-if="arbitraryPreviewError" class="preview-block" :style="{ fontSize: '1.25em' }">
				<span> {{ arbitraryPreviewError }} </span>
			</section>
			<section v-else-if="preview.images.size > 0 && !isProcessing && preview.loaded" class="preview-block">
				<div
					v-for="(im, index) in preview.images"
					:key="im.el.getAttribute('filename') ?? ''"
					class="preview-size"
					:class="{ 'is-large': index >= 3 }"
				>
					<img :src="im.el.src" />
					<p class="file-size">{{ im.img.width }} x {{ im.img.height }}</p>
					<p class="file-bytes">
						<LogoAVIF v-if="im.img.format === ImageFormat.AVIF" :style="{ fontSize: '1.25em' }" />
						{{ humanByteSize(im.img.size) }}
					</p>
				</div>
			</section>
			<section v-else-if="isProcessing" class="preview-block is-loading">
				<span class="emote-is-processing"> {{ t("emote.processing") }} </span>
			</section>
			<section v-else-if="emote && emote.lifecycle <= Emote.Lifecycle.DELETED" class="preview-block is-loading">
				<span :style="{ color: 'red' }"> {{ t("emote.no_longer_available") }} </span>
			</section>
			<section v-else-if="preview.errors < 4" class="preview-block is-loading">
				<span> {{ t("emote.preview_loading", [preview.count + 1, preview.images?.size]) }}</span>
			</section>
			<section v-else-if="preview.errors >= 4" class="preview-block is-loading">
				<span :style="{ color: 'red' }">{{ t("emote.preview_failed") }}</span>
			</section>

			<div v-if="!loading && emote" class="emote-tags">
				<EmoteTagList
					:clickable="true"
					:editable="canEditEmote"
					:limit="6"
					:batch-changes="true"
					:emote="emote"
					@update="updateTags"
				/>
			</div>

			<!-- Interactions: Actions, Versions & Comments -->
			<section vclass="interactive-block">
				<div class="emote-interactions">
					<EmoteInteractions
						v-if="emote"
						:emote="emote"
						:unlisted="!visible"
						@unlisted-show="visible = true"
					/>
				</div>
			</section>

			<div class="level-separation" />

			<section class="informative-block">
				<!-- Versioning -->
				<div section="versioning">
					<div class="section-head">
						<h3>{{ t("emote.versions") }}</h3>
					</div>
					<div class="section-content">
						<div v-if="emote && emote.versions?.length && preview.loaded">
							<EmoteVersions :emote="emote" :visible="visible ? [emote.id] : []" />
						</div>
					</div>
				</div>

				<!--  Channels -->
				<div v-if="channels" section="channels">
					<div class="section-head">
						<h3>{{ t("emote.channels") }} ({{ channels.total }})</h3>
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

				<!-- Audit Logs -->
				<div section="activity">
					<div class="section-head">
						<h3>{{ t("common.activity") }}</h3>
					</div>
					<div class="section-content">
						<div
							v-if="preview.loaded && visible && emote && Array.isArray(emote.activity)"
							class="activity-list"
						>
							<div v-for="log in emote?.activity" :key="log.id">
								<Activity :target="emote" :log="log" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Scroll section: Statistics
			<EmoteStats :emote-i-d="emoteID" />
			-->
		</template>
		<template v-else>
			<div class="emote-unknown">
				<NotFoundPage />
			</div>
		</template>
	</main>
</template>

<script setup lang="ts">
import { Emote } from "@structures/Emote";
import { computed, onUnmounted, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetEmoteChannels, GetEmote, GetEmoteActivity } from "@gql/emotes/emote";
import { ConvertIntColorToHex } from "@structures/util/Color";
import { ImageDef, ImageFormat, humanByteSize, Common } from "@structures/Common";
import { Permissions } from "@/structures/Role";
import { useActorStore } from "@store/actor";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useMutationStore } from "@/store/mutation";
import { useObjectWatch } from "@/store/object-watch";
import UserTag from "@components/utility/UserTag.vue";
import NotFoundPage from "@views/404.vue";
import EmoteInteractions from "@views/EmotePage/EmoteInteractions.vue";
import EmoteVersions from "@views/EmotePage/EmoteVersions.vue";
import LogoAVIF from "@components/base/LogoAVIF.vue";
import LogoWEBP from "@components/base/LogoWEBP.vue";
import Activity from "@/components/activity/Activity.vue";
import EmoteTagList from "../EmoteUpload/EmoteTagList.vue";

const { t } = useI18n();

const props = defineProps<{
	emoteID: string;
	emoteData?: string;
	headingOnly?: boolean;
	ignoreError?: string;
}>();

const actor = useActorStore();
const emoteID = ref(props.emoteID ?? "");
const emote = ref((props.emoteData ? JSON.parse(props.emoteData) : null) as Emote | null);
const title = computed(() =>
	"".concat(
		emote.value !== null ? emote.value.name : "Emote",
		emote.value?.owner ? ` by ${emote.value.owner.display_name}` : "",
		" - 7TV",
	),
);
useHead({ title });

const isProcessing = computed(
	() => emote.value?.lifecycle === Emote.Lifecycle.PENDING || emote.value?.lifecycle === Emote.Lifecycle.PROCESSING,
);
/** Whether or not the page was initiated with partial emote data  */
const partial = emote.value !== null;
const arbitraryPreviewError = ref("");
const visible = ref(true);

// Watch emote
const stoppers = [] as (() => void)[];
const objectWatch = useObjectWatch();

// Fetch emote
const { onResult, loading, stop, refetch, error } = useQuery<GetEmote>(GetEmote, { id: props.emoteID });
onResult((res) => {
	if (!res.data) {
		return;
	}

	emote.value = res.data.emote;
	defineLinks(selectedFormat.value);

	updateVisible(emote.value.listed);

	emote.value.images = currentVersion.value?.images ?? [];

	// Subscribe to changes
	stoppers.push(objectWatch.subscribeToObject(Common.ObjectKind.EMOTE, emote.value as Emote).stop);
});

stoppers.push(stop);

const canEditEmote = computed(
	() => emote.value?.owner?.id === actor.id || actor.hasPermission(Permissions.EditAnyEmote),
);

const updateVisible = (val: boolean) => {
	if (!emote.value) {
		return;
	}

	if (!val && actor.id !== emote.value.owner?.id && !actor.hasPermission(Permissions.EditAnyEmote)) {
		visible.value = false;
	} else {
		visible.value = true;
	}
};

// Fetch logs
const { onResult: onLogsFetched, refetch: refetchLogs } = useQuery<GetEmote>(GetEmoteActivity, { id: props.emoteID });

onLogsFetched(({ data }) => {
	const done = watch(
		emote,
		(e) => {
			if (!e) {
				return;
			}

			e.activity = data.emote.activity;
			setTimeout(() => done());
		},
		{ immediate: true },
	);
});

// Fetch channels
const { result: getChannels, refetch: refetchChannels } = useQuery<GetEmote>(GetEmoteChannels, {
	id: props.emoteID,
	page: 1,
	limit: 50,
});
const channels = computed<Emote.UserList>(
	() =>
		(preview.value.loaded ? getChannels.value?.emote.channels : null) ?? {
			total: 0,
			items: Array(50).fill({ id: null }),
		},
);

// Handle route changes
const route = useRoute();
watch(route, () => {
	if (route.name !== "Emote") {
		return;
	}
	emoteID.value = String(route.params.emoteID);
	refetch({ id: emoteID.value });
	refetchChannels({ id: emoteID.value, page: 1, limit: 50 });
	refetchLogs();
	updateVisible(currentVersion.value?.listed ?? false);
});

// Format selection
const selectedFormat = ref<ImageFormat>(actor.preferredFormat);

// Preload preview images
const currentVersion = computed(
	() => emote.value?.versions?.filter((ver) => emote.value && ver.id === emote.value.id)[0],
);
const preview = ref({
	loaded: false,
	count: 0,
	errors: 0,
	images: new Set<{ el: HTMLImageElement; img: ImageDef }>(),
});
const defineLinks = (format: ImageFormat) => {
	let loaded = 0;

	if (format === ImageFormat.AVIF && !actor.avifSupported) {
		arbitraryPreviewError.value = t("emote.avif_no_support", {
			BROWSER: `${actor.browser.name} ${actor.browser.version}`,
		});
	} else {
		arbitraryPreviewError.value = "";
	}

	preview.value.images.clear();
	preview.value.count = 0;
	preview.value.errors = 0;

	const imgs: ImageDef[] =
		currentVersion.value?.images.filter((im) => im.format === format).sort((a, b) => a.width - b.width) ??
		new Array(4).fill({});

	for (const im of imgs) {
		const w = im.width;
		const h = im.height;
		const imgEl = new Image(w, h);
		preview.value.images.add({ el: imgEl, img: im });
		imgEl.src = im.url;
		imgEl.setAttribute("filename", im.name);

		const listener: (this: HTMLImageElement, ev: Event) => void = function () {
			loaded++;
			preview.value.count = loaded;

			if (loaded >= 4) {
				preview.value.loaded = true;
				imgEl.removeEventListener("load", listener);
			}
		};
		imgEl.addEventListener("load", listener);
		imgEl.addEventListener("error", () => {
			preview.value.errors += 0.5;
		});
	}
};
if (partial) {
	defineLinks(ImageFormat.WEBP);
}
watch(selectedFormat, (format) => defineLinks(format));

// Update tags
const m = useMutationStore();
const updateTags = (tags: string[]) => {
	m.editEmote(emoteID.value, {
		tags,
	}).catch((err) => actor.showErrorModal(err));
};

const page = ref<HTMLDivElement | null>(null);
onUnmounted(() => {
	// Halt query
	stoppers.forEach((s) => s());
	emote.value = null;
});

const customName = computed(() =>
	actor.defaultEmoteSetID && emote.value
		? actor.getActiveEmoteInSet(actor.defaultEmoteSetID, emote.value?.id)?.name ?? ""
		: "",
);
</script>

<style lang="scss">
@import "@scss/emote-page/emote-page.scss";
</style>
