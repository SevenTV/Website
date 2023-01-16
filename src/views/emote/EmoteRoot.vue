<template>
	<main ref="page" class="emote-page">
		<!-- Heading Bar | Emote Title / Author -->
		<section class="heading-bar">
			<div v-if="ctx.emote?.owner" class="emote-author">
				<p>{{ t("emote.author") }}</p>
				<UserTag
					scale="1.5em"
					text-scale="1.3rem"
					:user="ctx.emote.owner"
					:clickable="true"
					:cosmetics="true"
				/>
			</div>
			<div v-else class="emote-author" />

			<div v-if="ctx.emote" class="emote-name">
				<p>{{ ctx.emote.name }}</p>
				<span v-if="actor.defaultEmoteSetID && customName && customName !== ctx.emote.name" class="set-renamed">
					as {{ customName }}
				</span>

				<!-- Trending state? -->
				<span v-if="ctx.emote.trending" :style="{ color: '#ff9632' }">
					<Icon icon="fire" />
					{{ t("emote.trending_rank", [ctx.emote.trending]) }}
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
			:emote="ctx.emote"
			:format="selectedFormat"
			:visible="visible"
			:version="ctx.currentVersion"
			@load-progress="imagesLoaded = $event.loaded"
		/>

		<div v-if="ctx.emote.id" class="emote-tags">
			<EmoteTagList
				:clickable="true"
				:editable="canEditEmote"
				:limit="6"
				:batch-changes="true"
				:emote="ctx.emote"
				@update="updateTags"
			/>
		</div>

		<!-- Interactions: Actions, Versions & Comments -->
		<section vclass="interactive-block">
			<div class="emote-interactions">
				<EmoteInteractions
					v-if="ctx.emote"
					:emote="ctx.emote"
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
					<div v-if="ctx.emote.id && ctx.emote.versions?.length && imagesLoaded">
						<EmoteVersions :emote="ctx.emote" :visible="visible ? [ctx.emote.id] : []" />
					</div>
				</div>
			</div>

			<!--  Channels -->
			<div v-if="ctx.channels" section="channels">
				<div class="section-head">
					<h3>{{ t("emote.channels") }} ({{ ctx.channels.total >= 0 ? ctx.channels.total : "..." }})</h3>
				</div>
				<div class="section-content">
					<Lazy>
						<div v-for="u in ctx.channels.items" :key="u.id" class="channel-card-wrapper" :ok="!!u.id">
							<router-link
								:to="u.id ? { name: 'UserOverview', params: { user: u.id } } : ''"
								class="unstyled-link"
								draggable="false"
							>
								<div
									v-wave
									:loading="!u.id"
									class="channel-card"
									:style="{
										color:
											u.style && u.style.color ? ConvertDecimalRGBAToString(u.style.color) : '',
									}"
								>
									<div class="user-picture">
										<UserTag v-if="u.id" :user="u" text-scale="0" scale="2.75em" />
									</div>
									<span class="nametag-only">
										<UserTag
											v-if="u.id"
											:user="u"
											text-scale="0.85em"
											:hide-avatar="true"
											:cosmetics="true"
										/>
									</span>
								</div>
							</router-link>
						</div>
					</Lazy>
				</div>
			</div>

			<!-- Audit Logs -->
			<div section="activity">
				<div class="section-head">
					<h3>{{ t("common.activity") }}</h3>
				</div>
				<div class="section-content">
					<div
						v-if="visible && ctx.emote.id && Array.isArray(ctx.logs) && imagesLoaded"
						class="activity-list"
					>
						<div v-for="log in ctx?.logs" :key="log.id">
							<Activity :target="ctx.emote" :log="log" />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Scroll section: Statistics
			<EmoteStats :emote-i-d="emoteID" />
			-->
	</main>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useMutationStore } from "@/store/mutation";
import { useActor } from "@store/actor";
import { ImageFormat } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { Permissions } from "@/structures/Role";
import { ConvertDecimalRGBAToString } from "@/structures/util/Color";
import { useContext } from "@/composables/useContext";
import EmoteInteractions from "@/views/emote/EmoteInteractions.vue";
import EmoteVersions from "@/views/emote/EmoteVersions.vue";
import Activity from "@/components/activity/Activity.vue";
import LogoAVIF from "@/components/base/LogoAVIF.vue";
import LogoWEBP from "@/components/base/LogoWEBP.vue";
import EmotePreviews from "@/components/emote/EmotePreviews.vue";
import Icon from "@/components/utility/Icon.vue";
import Lazy from "@/components/utility/Lazy.vue";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteTagList from "../emote-upload/EmoteTagList.vue";

const { t } = useI18n();
const actor = useActor();

const ctx = useContext("EMOTE");
if (!ctx?.emote) throw new Error("No emote data in context");

const imagesLoaded = ref(false);

// Format selection
const selectedFormat = ref<ImageFormat>(actor.preferredFormat);

const visible = ref(true);
const canEditEmote = computed(() => ctx.emote.owner?.id === actor.id || actor.hasPermission(Permissions.EditAnyEmote));

onUnmounted(() => (ctx.emote = { id: "" } as Emote));

watchEffect(() => {
	visible.value =
		!ctx.emote.id ||
		ctx.emote.states.includes("LISTED") ||
		ctx.emote.owner?.id === actor.id ||
		actor.hasPermission(Permissions.EditAnyEmote);
});

// Update tags
const m = useMutationStore();
const updateTags = (tags: string[]) => {
	m.editEmote(ctx.emote.id, {
		tags,
	}).catch((err) => actor.showErrorModal(err));
};

const page = ref<HTMLDivElement | null>(null);

const customName = computed(() =>
	actor.defaultEmoteSetID && ctx.emote
		? actor.getActiveEmoteInSet(actor.defaultEmoteSetID, ctx.emote.id)?.name ?? ""
		: "",
);
</script>

<style lang="scss">
@import "@scss/emote/emote-page.scss";
</style>
