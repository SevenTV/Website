<template>
	<main class="emote-previews">
		<section v-if="arbitraryPreviewError" class="preview-block" :style="{ fontSize: '1.25em' }">
			<span> {{ arbitraryPreviewError }} </span>
		</section>
		<section v-else-if="emote && emote.lifecycle <= Emote.Lifecycle.DELETED" class="preview-block is-loading">
			<span :style="{ color: 'red' }"> {{ t("emote.no_longer_available") }} </span>
		</section>
		<section v-else-if="!visible" class="preview-block in-unlisted-state">
			<h2 :style="{ color: 'rgb(255, 60, 60)' }">
				<Icon icon="warning" />
				{{ t("emote.unlisted.heading").toUpperCase() }}
			</h2>

			<p>
				{{ t("emote.unlisted.warning") }}
			</p>
			<p>{{ t("emote.unlisted.notice") }}</p>
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
		<section v-else-if="preview.images.size > 0 && preview.errors < 4" class="preview-block is-loading">
			<span> {{ t("emote.preview_loading", [preview.count + 1, preview.images?.size]) }}</span>
		</section>
		<section v-else-if="preview.errors >= 4" class="preview-block is-loading">
			<span :style="{ color: 'red' }">{{ t("emote.preview_failed") }}</span>
		</section>
		<section v-else-if="preview.images.size === 0" class="preview-block is-loading">
			<span>{{ t("common.loading") }}...</span>
		</section>
	</main>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useActor } from "@/store/actor";
import { ImageFile, ImageFormat, humanByteSize } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
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
	emote: Emote;
	format: ImageFormat;
	visible?: boolean;
}>();

const emote = toRef(props, "emote");

const { t } = useI18n();
const actor = useActor();
const host = computed(
	() => emote.value.versions?.find((v) => v.id === emote.value.id)?.host ?? emote.value.host ?? null,
);
const arbitraryPreviewError = ref("");

const isProcessing = ref(false);

const preview = reactive<PreviewState>({
	loaded: false,
	count: 0,
	errors: 0,
	images: new Set<{ el: HTMLImageElement; img: ImageFile }>(),
});

const defineLinks = (format: ImageFormat) => {
	if (!emote.value.id) return;
	if (!host.value) return;

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

	const imgs: ImageFile[] =
		host.value.files?.filter((im) => im.format === format).sort((a, b) => a.width - b.width) ??
		new Array(4).fill({});

	for (const im of imgs) {
		const w = im.width;
		const h = im.height;
		const imgEl = new Image(w, h);
		preview.images.add({ el: imgEl, img: im });
		imgEl.src = `${host.value.url}/${im.name}`;
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

watchEffect(() => {
	isProcessing.value =
		emote.value.lifecycle === Emote.Lifecycle.PENDING || emote.value.lifecycle === Emote.Lifecycle.PROCESSING;

	defineLinks(props.format);
});

watch(
	props,
	() => {
		defineLinks(props.format);
	},
	{ immediate: true },
);

watch(preview, (x) => emit("load-progress", x));
</script>

<style lang="scss">
@import "@scss/themes.scss";

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
			min-height: 13.75em;

			> span {
				font-size: 1.5em;
				animation: blink 1.5s infinite ease-in-out;
			}
			> .emote-is-processing {
				color: red;
			}

			@include themify() {
				@keyframes blink {
					0% {
						color: darken(themed("color"), 50%);
					}
					50% {
						color: currentColor;
					}
					100% {
						color: darken(themed("color"), 50%);
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
