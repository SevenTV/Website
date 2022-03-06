<template>
	<div class="emote-version-list">
		<div
			v-for="(version, i) of versions"
			:key="version.id"
			class="emote-version-wrapper"
			:class="{ even: i % 2 === 0 }"
		>
			<router-link
				:to="{ name: 'Emote', params: { emoteID: version?.id } }"
				:current="emote.id === version.id"
				class="emote-version unstyled-link"
			>
				<div>
					<div class="version-info">
						<h3 class="version-title">
							<span>{{ version?.name || "Initial Submission" }}</span>
							<div class="label-list">
								<div v-for="l of labels" :key="l.name" class="version-label">
									<label v-if="l.condition(version)" :name="l.name">
										<span>{{ l.name }}</span>
									</label>
								</div>
								<div v-if="activeSets.get(version.id)?.length" class="version-label">
									<label
										name="active-set-count"
										:class="{
											'in-default-set': activeSets.get(version.id)?.map((es) => es.id).includes(defaultEmoteSetID as string),
										}"
									>
										<span>{{
											t(
												"emote.in_n_sets",
												[activeSets.get(version.id)?.length],
												getActiveSets(version).length
											).toUpperCase()
										}}</span>
									</label>
								</div>
							</div>
						</h3>
						<span v-if="version?.diverged" class="version-diverged">DIVERGED</span>
						<div class="version-description">{{ version?.description }}</div>
					</div>
					<div class="version-timestamp">
						<span>{{ getCreationDate(version) }}</span>
					</div>
				</div>

				<div v-if="version.lifecycle === Emote.Lifecycle.LIVE" class="version-thumbnail">
					<img :src="Emote.GetUrl(version.images, Common.Image.Format.WEBP, '3x')" />
				</div>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watch } from "vue";
import { Common } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import { useActorStore } from "@/store/actor";
import { useI18n } from "vue-i18n";
import formatDate from "date-fns/fp/format";

const { t } = useI18n();
const props = defineProps<{
	emote: Emote;
}>();

const versions = computed(
	() =>
		[...(props.emote?.versions ?? [])].sort((v1, v2) => {
			const a = new Date(v1.timestamp);
			const b = new Date(v2.timestamp);
			return b.getTime() - a.getTime();
		}) ?? []
);

const { editableEmoteSets, defaultEmoteSetID } = useActorStore();
const activeSets = ref(new Map<string, EmoteSet[]>());
watch(editableEmoteSets, (setMap) => {
	activeSets.value.clear();
	for (const ver of versions.value) {
		activeSets.value.set(
			ver.id,
			Array.from(setMap.values()).filter((es) => es.emotes.filter((ae) => ae.id === ver.id).length > 0)
		);
	}
});
const getActiveSets = (version: Emote.Version) =>
	Array.from(editableEmoteSets.values()).filter((es) => es.emotes.filter((ae) => ae.id === version.id).length > 0);
const getCreationDate = (version: Emote.Version) => formatDate("MMMM d, y p")(new Date(version.timestamp ?? 0));
const labels = computed(() => [
	{
		name: "LATEST",
		condition: (v: Emote.Version) => v.id === versions.value[0].id,
	},
]);
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
@import "@scss/common/shape.scss";

.emote-version-list {
	@include themify() {
		.emote-version-wrapper {
			background-color: lighten(themed("backgroundColor"), 2);
			&.even {
				background-color: lighten(themed("backgroundColor"), 3);
			}
		}

		.emote-version {
			border: 0.175em solid mix(themed("backgroundColor"), themed("color"), 85);
			border-right-width: 1px;
			border-left: none;
			&:hover {
				background-color: darken(themed("backgroundColor"), 1);
			}
			&.router-link-active {
				border-right-color: themed("accent");
				border-right-width: 0.25em;
			}
			> .version-diverged {
				background-color: mix(themed("primary"), purple);
			}
			> :nth-child(1) {
				h3.version-title > .label-list > .version-label > label {
					&[name="LATEST"] {
						color: themed("accent");
					}
					&.in-default-set {
						color: themed("primary");
					}
					background-color: darken(themed("backgroundColor"), 4);
				}
				> .version-timestamp {
					color: mix(themed("backgroundColor"), themed("color"), 22.5);
				}
			}
		}
	}
}

.emote-version {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	min-height: 8em;

	> :nth-child(1) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		> .version-info {
			padding: 0.5em;
		}
		h3.version-title {
			display: flex;
			font-weight: 200;
			letter-spacing: 0.05em;
			font-size: 1.25em;
			margin-bottom: 0.33em;
			> .label-list {
				display: flex;
				align-items: center;
				margin-left: 0.175em;
				> .version-label {
					display: flex;
					margin-right: 0.1em;
					margin-left: 0.1em;
					> label {
						border: 0.05em solid;
						font-weight: 500;
						font-size: 0.75rem;
						letter-spacing: 0.033em;
						border-radius: 0.175em;
						padding: 0.25em;
					}
				}
			}
		}
		.version-diverged {
			width: min-content;
			padding: 0.25em;
			border-radius: 0.5em;
			font-size: 0.75em;
		}

		.version-timestamp {
			margin-left: 0.5em;
			margin-bottom: 0.5em;
			font-size: 0.75em;
		}
	}

	> :nth-child(2) {
		display: flex;
		align-items: center;
		> img {
			width: 85%;
		}
	}
}
</style>
