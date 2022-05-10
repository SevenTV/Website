<template>
	<div class="emote-upload">
		<!-- Heading -->
		<div class="heading">
			<h2>{{ t(txt.submitEmote) }}</h2>
		</div>

		<!-- Content -->
		<div class="content">
			<div class="overall-form">
				<!-- Information Inputs -->
				<div class="inputs form-grid-item">
					<h3>{{ t(txt.emoteDetails) }}</h3>

					<form>
						<TextInput v-model="form.name" class="form-item" :label="t(txt.inputEmoteName)" />
						<TextInput
							v-if="parentEmote"
							v-model="form.version_description"
							:label="t('emote.upload.version_description')"
						/>
					</form>
				</div>

				<!-- Image Upload -->
				<div class="image-upload form-grid-item">
					<span />
					<div
						:dragOver="dragOver"
						@drop.prevent="onDropFile"
						@dragover.prevent
						@dragenter="dragOver = true"
						@dragleave="dragOver = false"
					>
						<h3>{{ t("emote.upload.image_upload") }}</h3>
						<a class="acceptable-format-list" @click="formatsViewerOpen = !formatsViewerOpen">
							{{ t("emote.upload.accepted_formats") }}
							<font-awesome-icon v-if="formatsViewerOpen" :icon="['fas', 'times']" />
						</a>
						<div v-if="formatsViewerOpen" ref="formatsViewer" class="formats-viewer">
							<div class="format" categories>
								<div part="label">{{ t("emote.upload.filetype") }}</div>
								<div part="animation">{{ t("emote.upload.animation") }}</div>
								<div part="transparency">{{ t("emote.upload.transparency") }}</div>
							</div>
							<div v-for="f of acceptableFileTypes" :key="f.label" class="format" :format="f.mime">
								<div part="label">{{ f.label }}</div>
								<div part="animation">
									<font-awesome-icon v-if="f.animation" :icon="['fas', 'check']" color="lime" />
									<font-awesome-icon v-else :icon="['fas', 'times']" color="red" />
								</div>
								<div part="transparency">
									<font-awesome-icon
										v-if="f.transparency == 'full'"
										:icon="['fas', 'check']"
										color="lime"
									/>
									<Tooltip
										v-else-if="f.transparency == 'half'"
										:text="t('emote.upload.half_transparency_tooltip')"
									>
										<font-awesome-icon :icon="['fas', 'check']" color="orange" />
									</Tooltip>
									<font-awesome-icon v-else :icon="['fas', 'times']" color="red" />
								</div>
							</div>
						</div>
						<input id="file-upload" hidden type="file" :accept="mimeList" @change="onFileInputChange" />
						<label for="file-upload">
							<img ref="previewImage" />
						</label>
					</div>
					<!-- TODO -->
					<span>
						<div v-if="parentEmote" class="parent-emote">
							<img
								:src="
									Emote.GetImage(
										Emote.GetCurrentVersion(parentEmote)?.images ?? [],
										Common.Image.Format.WEBP,
										'2x',
									)?.url
								"
							/>
							<div class="as-child-notice">
								<i18n-t keypath="emote.upload.as_child" tag="p">
									<span style="font-weight: 600">{{ parentEmote.name }}</span>
								</i18n-t>
							</div>
						</div>
					</span>
				</div>

				<div class="inputs form-grid-item" side="right">
					<!-- TODO -->
					<span>TODO: credits, mod notes</span>
				</div>
			</div>

			<!-- Uplload Button -->
			<span v-if="uploadError" class="upload-error">Error: {{ uploadError }}</span>
			<div class="actions">
				<div class="progress" :style="{ width: !uploadProgress ? 'inherit' : `${uploadProgress.toFixed(5)}%` }">
					<span :style="{ justifyContent: !uploadProgress ? 'center' : 'flex-end' }">
						<span v-if="uploadProgress > 0" class="progress-counter">{{ uploadProgress.toFixed(1) }}%</span>
						<span v-else class="submit-button" @click="upload">SUBMIT</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { t } from "@/i18n";
import { LocalStorageKeys } from "@store/lskeys";
import { Emote } from "@structures/Emote";
import { Common } from "@structures/Common";
import router from "@/router";
import TextInput from "@components/form/TextInput.vue";
import Tooltip from "@components/utility/Tooltip.vue";
import { useQuery } from "@vue/apollo-composable";
import { GetEmote } from "@gql/emotes/emote";
import { useRoute } from "vue-router";

const props = defineProps<{
	parentID?: string;
	parentData?: string;
}>();
// File Formats
const acceptableFileTypes = [
	{ mime: "image/avif", label: "AVIF", transparency: "full", animation: true },
	{ mime: "image/webp", label: "WEBP", transparency: "full", animation: true },
	{ mime: "image/gif", label: "GIF", transparency: "half", animation: true },
	{ mime: "image/png,image/apng", label: "PNG", transparency: "full", animation: true },
	{ mime: "image/tiff", label: "TIFF", transparency: "full" },
	{ mime: "image/jpeg", label: "JPEG" },
	{ mime: "video/webm", label: "WEBM", animation: true },
	{ mime: "video/mp4", label: "MP4", animation: true },
	{ mime: "video/x-flv", label: "FLV", animation: true },
	{ mime: "video/avi,video/x-msvideo", label: "AVI", animation: true },
	{ mime: "video/quicktime", label: "MOV", animation: true },
] as FileType[];
const mimeList = acceptableFileTypes.map((ft) => ft.mime).join(",");

// Gather versioning info
const route = useRoute();
const parentID = ref(props.parentID ?? route.query.parentID?.toString() ?? null);
const parentEmote = ref<Emote | null>(props.parentData ? JSON.parse(props.parentData) : null);
if (parentID.value) {
	const { onResult } = useQuery<GetEmote>(GetEmote, { id: parentID.value });
	onResult((res) => (parentEmote.value = res.data.emote));
}

// Formats viewer
const formatsViewerOpen = ref(false);

// Form
const form = reactive({
	name: "",
	version_description: "",
	isCreator: false,

	credits: {
		original_creator: "",
	},
});

// Input File
const previewImage = ref<HTMLImageElement | null>(null);
let buf: ArrayBuffer | null = null;
let mime = "";
const onFileInputChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0] as File;
	handleFile(file);
};
const dragOver = ref(false);
const onDropFile = (event: DragEvent) => {
	dragOver.value = false;
	const file = event.dataTransfer?.files[0] as File;
	if (!file) {
		throw new Error("No file provided during drop event");
	}
	handleFile(file);
};
const handleFile = async (file: File) => {
	const url = URL.createObjectURL(file);
	if (previewImage.value) {
		previewImage.value.src = url;
		previewImage.value.onload = () => URL.revokeObjectURL(url);
	}

	mime = file.type;
	buf = await file.arrayBuffer();
	if (!form.name) {
		form.name = file.name.slice(0, file.name.lastIndexOf("."));
	}
};

// Upload (network request)
const uploadProgress = ref(0);
const uploadError = ref("");
const upload = () => {
	uploadError.value = "";
	const data = {
		name: !parentEmote.value ? form.name : parentEmote.value.name,
	} as Record<string, unknown>;
	// Add versioning data
	if (parentEmote.value) {
		data.version = {
			parent_id: parentEmote.value.id,
			name: form.name,
			description: form.version_description,
			flags: 0,
		};
	}
	if (!buf) {
		uploadError.value = "Missing file";
		return;
	}

	const req = new XMLHttpRequest();
	req.open("POST", `${import.meta.env.VITE_APP_API_REST as string}/emotes`, true);
	req.setRequestHeader("X-Emote-Data", JSON.stringify(data));
	req.setRequestHeader("Content-Type", mime);
	req.setRequestHeader("Content-Length", buf.byteLength.toString(10));
	req.setRequestHeader("Authorization", `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`);
	req.upload.onprogress = (progress) => (uploadProgress.value = (progress.loaded / progress.total) * 100);
	req.onload = () => {
		uploadProgress.value = 0;
		if (req.status !== 201) {
			const { error } = JSON.parse(req.responseText);
			uploadError.value = `${error} (${req.status} ${req.statusText})`;
		}
		// upload is complete, redirect to the emote's page
		const { id } = JSON.parse(req.responseText);
		if (typeof id === "string" && id.length > 0) {
			router.push(`/emotes/${id}`);
		}
	};

	req.send(buf);
};

//
const txt = computed(() =>
	!parentEmote.value
		? {
				submitEmote: "emote.upload.submit_emote",
				emoteDetails: "emote.upload.emote_details",
				inputEmoteName: "emote.upload.emote_name",
		  }
		: {
				submitEmote: "emote.upload.create_emote_version",
				emoteDetails: "emote.upload.version_details",
				inputEmoteName: "emote.upload.version_name",
		  },
);

// const emoteRegexp = /^[-_A-Za-z():0-9]{100}$/;

interface FileType {
	mime: string;
	label: string;
	animation?: boolean;
	transparency?: "full" | "half" | false;
}
</script>

<style lang="scss" scoped>
@import "@scss/emote-upload/emote-upload.scss";
</style>
