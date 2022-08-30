<template>
	<main ref="page" class="emote-page">
		<template v-if="loading || ignoreError || !error">
			<!-- Heading Bar | Emote Title / Author -->
			<section class="heading-bar">
				<div v-if="emote && emote.owner" class="emote-author">
					<p>{{ t("emote.author") }}</p>
					<UserTag scale="1.5em" text-scale="1.3rem" :user="emote.owner" :clickable="true" />
				</div>
				<div v-else class="emote-author" />

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
			<EmotePreviews
				:emote="emote"
				:format="selectedFormat"
				:visible="visible"
				:version="currentVersion"
				@load-progress="preview = $event"
			/>

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
						<div v-if="emote && emote.versions?.length && preview && preview.loaded">
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
							v-if="preview && preview.loaded && visible && emote && Array.isArray(emote.activity)"
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
import { ImageFormat, Common } from "@structures/Common";
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
import EmotePreviews, { PreviewState } from "./EmotePreviews.vue";

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
/** Whether or not the page was initiated with partial emote data  */
const visible = ref(true);

// Watch emote
const stoppers = [] as (() => void)[];
const objectWatch = useObjectWatch();

// Previews&
const preview = ref<PreviewState | null>(null);

// Fetch emote
const { onResult, loading, stop, refetch, error } = useQuery<GetEmote>(GetEmote, { id: props.emoteID });
onResult((res) => {
	if (!res.data) {
		return;
	}

	emote.value = res.data.emote;

	selectedFormat.value = actor.preferredFormat;

	updateVisible(emote.value.listed);

	emote.value.images = currentVersion.value?.images ?? [];

	// Subscribe to changes
	stoppers.push(
		objectWatch.subscribeToObject(Common.ObjectKind.EMOTE, emote.value as Emote, (x) => {
			if (!emote.value) return;

			emote.value = x;
		}).stop,
	);
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
		(preview.value?.loaded ? getChannels.value?.emote.channels : null) ?? {
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
