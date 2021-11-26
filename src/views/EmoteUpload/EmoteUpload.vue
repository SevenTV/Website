<template>
	<div class="emote-upload">
		<!-- Heading -->
		<div class="heading">
			<h2>Submit Emote</h2>
		</div>

		<!-- Content -->
		<div class="content">
			<div class="interactive-block">
				<div class="content-notice">
					<h4>{{ $t("emote.upload.content_moderation") }}</h4>
					<span>{{ $t("emote.upload.moderation_notice") }}</span>
				</div>

				<div class="overall-form">
					<div class="image-upload">
						<h3>Image Upload</h3>
						<a
							ref="formatsViewerTrigger"
							class="acceptable-format-list"
							@click="formatsViewerOpen = !formatsViewerOpen"
						>
							Accepted Formats
							<font-awesome-icon v-if="formatsViewerOpen" :icon="['fas', 'times']" />
						</a>
						<div v-if="formatsViewerOpen" ref="formatsViewer" class="formats-viewer">
							<div class="format" categories>
								<div part="label">File</div>
								<div part="animation">Animation</div>
								<div part="transparency">Transparency</div>
							</div>
							<div v-for="f of acceptableFileTypes" :key="f.label" class="format" :format="f.mime">
								<div part="label">{{ f.label }}</div>
								<div part="animation">
									<font-awesome-icon v-if="f.animation" :icon="['fas', 'check']" color="lime" />
									<font-awesome-icon v-else :icon="['fas', 'times']" color="red" />
								</div>
								<div part="transparency">
									<font-awesome-icon v-if="f.transparency" :icon="['fas', 'check']" color="lime" />
									<font-awesome-icon v-else :icon="['fas', 'times']" color="red" />
								</div>
							</div>
						</div>

						<input id="file-upload" hidden type="file" :accept="mimeList" @change="onFileInputChange" />
						<label for="file-upload">
							<img ref="previewImage" />
						</label>
					</div>

					<div class="inputs">
						<h3>Emote Details</h3>

						<form>
							<TextInput v-model="form.name" class="form-item" label="Emote Name" />

							<h4>Attribution</h4>
							<Checkbox
								v-model:checked="form.isCreator"
								class="form-item"
								label="I made this emote"
								scale="1.25rem"
							/>
							<div v-if="!form.isCreator" credit-form>
								<TextInput v-model="form.credits.original_creator" label="Original Creator" />
							</div>
						</form>
					</div>
				</div>
			</div>

			<!-- Upload Progress Bar -->
			<div class="progress-bar">
				<div v-if="uploadProgress > 0.0">
					<h3>Uploading...</h3>
					<span class="upload-percent-progress">{{ uploadProgress.toFixed(1) }}%</span>
				</div>
				<span v-if="uploadError" class="upload-error">Error: {{ uploadError }}</span>
			</div>

			<!-- Uplload Button -->
			<div class="actions">
				<Button label="SUBMIT" color="primary" @click="upload" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TextInput from "@/components/form/TextInput.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Button from "@/components/utility/Button.vue";
import router from "@/router";

export default defineComponent({
	components: { TextInput, Checkbox, Button },
	setup() {
		// File Formats
		const acceptableFileTypes = [
			{ mime: "image/gif", label: "GIF", transparency: true, animation: true },
			{ mime: "image/avif", label: "AVIF", transparency: true, animation: true },
			{ mime: "image/webp", label: "WEBP", transparency: true, animation: true },
			{ mime: "image/png,image/apng", label: "PNG", animation: true, transparency: true },
			{ mime: "image/tiff", label: "TIFF", transparency: true },
			{ mime: "image/jpeg", label: "JPEG" },
			{ mime: "video/webm", label: "WEBM", animation: true },
			{ mime: "video/mp4", label: "MP4", animation: true },
			{ mime: "video/x-flv", label: "FLV", animation: true },
			{ mime: "video/avi,video/x-msvideo", label: "AVI", animation: true },
			{ mime: "video/quicktime", label: "MOV", animation: true },
		] as FileType[];
		const mimeList = acceptableFileTypes.map((ft) => ft.mime).join(",");

		// Formats viewer
		const formatsViewerOpen = ref(false);

		// Form
		const form = reactive({
			name: "",
			isCreator: false,

			credits: {
				original_creator: "",
			},
		});

		// Submit
		const previewImage = ref<HTMLImageElement | null>(null);
		let buf: ArrayBuffer | null = null;
		let mime = "";
		const onFileInputChange = async (event: Event) => {
			const target = event.target as HTMLInputElement;
			const file = target.files?.[0] as File;
			// const buf = await target.arrayBuffer();

			const url = URL.createObjectURL(file);
			if (previewImage.value) {
				previewImage.value.src = url;
				previewImage.value.onload = () => URL.revokeObjectURL(url);
			}

			mime = file.type;
			buf = await file.arrayBuffer();
			if (!form.name) {
				form.name = file.name.substr(0, file.name.lastIndexOf("."));
			}
		};

		const uploadProgress = ref(0);
		const uploadError = ref("");
		const upload = () => {
			const data = JSON.stringify({
				name: form.name,
				tags: ["foo", "baz", "bar"],
			});

			const req = new XMLHttpRequest();
			req.open("POST", `${import.meta.env.VITE_APP_API_REST as string}/v3/emotes`, true);
			req.setRequestHeader("X-Emote-Data", data);
			req.setRequestHeader("Content-Type", mime);
			req.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
			req.upload.onprogress = (progress) => (uploadProgress.value = (progress.loaded / progress.total) * 100);
			req.onload = () => {
				uploadProgress.value = 0;
				if (req.status !== 201) {
					const { message } = JSON.parse(req.responseText);
					uploadError.value = `${message} (${req.status} ${req.statusText})`;
				}
				// upload is complete, redirect to the emote's page
				const { id } = JSON.parse(req.responseText);
				if (typeof id === "string" && id.length > 0) {
					router.push(`/emotes/${id}`);
				}
			};

			req.send(buf);
		};

		return {
			acceptableFileTypes,
			mimeList,
			formatsViewerOpen,
			form,
			previewImage,
			onFileInputChange,
			upload,
			uploadProgress,
			uploadError,
		};
	},
});

// const emoteRegexp = /^[-_A-Za-z():0-9]{100}$/;

interface FileType {
	mime: string;
	label: string;
	animation?: boolean;
	transparency?: boolean;
}
</script>

<style lang="scss" scoped>
@import "@scss/emote-upload/emote-upload.scss";
</style>
