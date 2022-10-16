<template>
	<main class="emote-previews">
		<section v-if="!visible" class="preview-block in-unlisted-state">
			<h2 :style="{ color: 'rgb(255, 60, 60)' }">
				<Icon icon="warning" />
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
				<p v-if="im.img.width && im.img.height" class="file-size">{{ im.img.width }} x {{ im.img.height }}</p>
				<p v-if="typeof im.img.size === 'number'" class="file-bytes">
					<LogoAVIF v-if="im.img.format === ImageFormat.AVIF" :style="{ fontSize: '1.25em' }" />
					{{ humanByteSize(im.img.size) }}
				</p>
			</div>
		</section>
		<section v-else-if="isProcessing" class="preview-block is-loading">
			<span class="emote-is-processing"> {{ t("emote.processing") }} </span>
		</section>
		<section v-else-if="emote && emote.lifecycle === Emote.Lifecycle.FAILED" class="preview-block is-loading">
			<span :style="{ color: 'red' }"> {{ t("emote.processing_failed", [currentVersion?.error]) }} </span>
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
	</main>
</template>

<script setup lang="ts">
import { useActorStore } from "@/store/actor";
import { Emote, EmoteVersion } from "@/structures/Emote";
import { ImageFormat, humanByteSize, ImageFile } from "@structures/Common";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import LogoAVIF from "@/components/base/LogoAVIF.vue";
import Icon from "@/components/utility/Icon.vue";

export interface PreviewState {
	loaded: boolean;
	count: number;
	errors: number;
	images: Set<{ el: HTMLImageElement; img: ImageFile }>;
}

const emit = defineEmits<{
	(e: "load-progress", state: PreviewState): void;
}>();

const props = defineProps<{
	emote: Emote | null;
	format: ImageFormat;
	visible?: boolean;
	version?: EmoteVersion;
}>();

const { t } = useI18n();

const actor = useActorStore();
const currentVersion = computed(() => props.emote?.versions.find((v) => v.id === (props.emote as Emote).id));
const arbitraryPreviewError = ref("");

const isProcessing = computed(
	() => props.emote?.lifecycle === Emote.Lifecycle.PENDING || props.emote?.lifecycle === Emote.Lifecycle.PROCESSING,
);

const preview = reactive<PreviewState>({
	loaded: false,
	count: 0,
	errors: 0,
	images: new Set<{ el: HTMLImageElement; img: ImageFile }>(),
});
const defineLinks = (format: ImageFormat) => {
	if (!props.emote) return;

	let loaded = 0;

	if (format === ImageFormat.AVIF && !actor.avifSupported) {
		arbitraryPreviewError.value = t("emote.avif_no_support", {
			BROWSER: `${actor.browser.name} ${actor.browser.version}`,
		});
	} else {
		arbitraryPreviewError.value = "";
	}

	preview.images.clear();
	preview.count = 0;
	preview.errors = 0;

	const host = props.emote.host ?? props.version?.host;
	const imgs: ImageFile[] =
		host.files.filter((im) => im.format === format).sort((a, b) => a.width - b.width) ?? new Array(4).fill({});

	for (const im of imgs) {
		const w = im.width;
		const h = im.height;
		const imgEl = new Image(w, h);
		preview.images.add({ el: imgEl, img: im });
		imgEl.src = `${host.url}/${im.name}`;
		imgEl.setAttribute("filename", im.name);

		const listener: (this: HTMLImageElement, ev: Event) => void = function () {
			loaded++;
			preview.count = loaded;

			if (loaded >= 4) {
				preview.loaded = true;
				imgEl.removeEventListener("load", listener);
			}
		};
		imgEl.addEventListener("load", listener);
		imgEl.addEventListener("error", () => {
			preview.errors += 0.5;
		});
	}
};

watch(
	props,
	(x) => {
		if (!x.emote) return;

		defineLinks(props.format);
	},
	{ immediate: true },
);

watch(preview, (x) => emit("load-progress", x));
</script>

<style lang="scss">
main.emote-previews {
	.preview-block {
		padding: 0.25em;
		border-radius: 0.3em;
		position: relative;

		display: grid;
		grid-template-columns: repeat(4, auto);
		column-gap: 4em;
		align-items: baseline;
		justify-content: center;
		align-self: center;

		@media screen and (max-width: 1110px) {
			grid-template-columns: auto;
			text-align: center;

			.preview-size {
				margin-top: 2em;
			}
		}

		.preview-size {
			display: block;
			width: 100%;
			height: 100%;

			> img {
				margin-bottom: 1em;
			}

			> p {
				font-size: 0.66em;
				text-align: center;
				& ~ p {
					margin-top: 0.25em;
				}
			}

			@media screen and (max-width: 600px) {
				&.is-large {
					display: none;
				}
			}
		}

		&.is-loading {
			display: flex !important;
			align-items: center;
			justify-content: center;
			min-height: 11.5em;

			> span {
				font-size: 1.5em;
			}
			> .emote-is-processing {
				color: currentColor;
				animation: processingBlink 3s infinite ease-in-out;
				@keyframes processingBlink {
					0% {
						color: currentColor;
					}
					33% {
						color: red;
					}
					66% {
						color: currentColor;
					}
				}
			}
		}

		&.in-unlisted-state {
			display: block;
			text-align: center;
			padding: 2.5em;

			> h2 {
				font-size: 2em;
			}

			> p {
				margin-left: 25%;
				margin-right: 25%;
			}
		}
	}
}
</style>
