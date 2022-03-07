<template>
	<div class="emote-version-list">
		<div
			v-for="(version, i) of versions"
			:key="version.id"
			ref="xd"
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
								<div v-for="l of labels" :key="l.id" class="version-label">
									<label v-if="l.condition(version)" :name="l.name(version)">
										<span>{{ l.name(version) }}</span>
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

				<div
					:style="{ backgroundImage: `url(${Emote.GetUrl(version.images, Common.Image.Format.WEBP, '3x')})` }"
				></div>
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

const { editableEmoteSets } = useActorStore();
const activeSets = ref({} as Record<string, EmoteSet[]>);
watch(
	editableEmoteSets,
	(setMap) => {
		activeSets.value = {};
		for (const ver of versions.value) {
			activeSets.value[ver.id] = Array.from(setMap.values()).filter(
				(es) => es.emotes?.filter((ae) => ae.id === ver.id).length > 0
			);
		}
	},
	{ immediate: true }
);
const getCreationDate = (version: Emote.Version) => formatDate("MMMM d, y p")(new Date(version.timestamp ?? 0));
const labels = ref([] as VersionLabel[]);
watch(
	versions,
	() => {
		labels.value = [
			{
				id: "a",
				name: () => "LATEST",
				condition: (v: Emote.Version) => v.id === versions.value[0].id,
			},
			{
				id: "b",
				name: (v: Emote.Version) =>
					t(
						"emote.in_n_sets",
						[activeSets.value[v.id]?.length],
						activeSets.value[v.id]?.length ?? 0
					).toUpperCase(),
				condition: (v: Emote.Version) => activeSets.value[v.id]?.length > 0,
			},
		];
	},
	{ immediate: true, deep: true }
);

interface VersionLabel {
	id: string;
	name: (v: Emote.Version) => string;
	condition: (v: Emote.Version) => boolean;
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
@import "@scss/common/shape.scss";

.emote-version-list {
	@include themify() {
		$bgColor: darken(themed("backgroundColor"), 4);
		.emote-version-wrapper {
			background-color: lighten($bgColor, 1);
			&.even {
				background-color: $bgColor;
			}
		}

		.emote-version {
			border: 0.01em solid mix(themed("backgroundColor"), themed("color"), 85);
			border-right-width: 0.01em;
			border-left: none;
			&:hover,
			&.router-link-active {
				background-color: darken($bgColor, 1);
			}
			&.router-link-active {
				border-right-color: themed("accent");
				border-right-width: 0.15em;
			}
			> .version-diverged {
				background-color: mix(themed("primary"), purple);
			}
			> :nth-child(1) {
				h3.version-title > .label-list > .version-label > label {
					&[name="LATEST"] {
						color: themed("accent");
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
			flex-wrap: wrap;
			font-weight: 200;
			letter-spacing: 0.05em;
			font-size: 1.25em;
			margin-bottom: 0.33em;
			> span {
				margin-right: 0.175em;
			}
			> .label-list {
				display: flex;
				align-items: center;
				> .version-label {
					display: flex;
					margin-right: 0.15em;
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
		margin: 1.5em;
		width: 6.5rem;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: contain;
	}
}
</style>
