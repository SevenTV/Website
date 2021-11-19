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
					<span> {{ $t("emote.upload.moderation_notice") }} </span>
				</div>

				<div class="image-upload">
					<h3>Image Upload</h3>
					<p class="acceptable-format-list">
						Accepted Formats:
						<span>{{ humanFormatList }}</span>
					</p>

					<input id="file-upload" hidden type="file" :accept="mimeList" @change="onFileInputChange" />
					<label for="file-upload">
						<img ref="previewImage" />
					</label>
				</div>

				<div class="inputs">
					<h3>Emote Details</h3>

					<form>
						<TextInput class="form-item" label="Emote Name" v-model="form.name" />
						<Checkbox
							class="form-item"
							label="I made this emote"
							scale="1.25rem"
							v-model:checked="form.isCreator"
						/>
						<div credit-form v-if="!form.isCreator">
							<TextInput label="Original Creator" v-model="form.credits.original_creator" />
						</div>
					</form>
				</div>
			</div>

			<!-- Upload Progress Bar -->
			<div class="progress-bar">todo</div>

			<!-- Uplload Button -->
			<div class="actions">
				<Button label="SUBMIT" color="primary" @click="upload" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue-demi";
import TextInput from "@/components/form/TextInput.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Button from "@/components/utility/Button.vue";

export default defineComponent({
	components: { TextInput, Checkbox, Button },
	setup() {
		// File Formats
		const acceptableFileTypes = [
			{ mime: "image/avif", label: "AVIF", transparency: true, animation: true },
			{ mime: "image/webp", label: "WEBP", transparency: true, animation: true },
			{ mime: "image/gif", label: "GIF", transparency: true, animation: true },
			{ mime: "image/jpeg", label: "JPEG" },
			{ mime: "image/png", label: "PNG", transparency: true },
			{ mime: "image/tiff", label: "TIFF", transparency: true },
			{ mime: "video/webm", label: "WEBM", animation: true },
			{ mime: "video/mp4", label: "MP4", animation: true },
			{ mime: "video/x-flv", label: "FLV", animation: true },
			{ mime: "video/avi,video/x-msvideo", label: "AVI", animation: true },
		] as FileType[];
		const mimeList = acceptableFileTypes.map((ft) => ft.mime).join(",");
		const humanFormatList = acceptableFileTypes
			.map((ft) => ft.label)
			.join(", ")
			.replace(/,([^,]*)$/, " and $1");

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
		const upload = () => {
			const req = new XMLHttpRequest();
			req.open("POST", `${import.meta.env.VITE_APP_API_REST as string}/v3/emotes`, true);
			req.setRequestHeader("X-Emote-Name", form.name);
			req.setRequestHeader("Content-Type", mime);
			req.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
			req.onprogress = (progress) => console.log("pog ress", progress);
			req.onload = () => {
				// ok.
				console.log("upload done");
			};

			console.log("starting upload", buf);
			req.send(buf);
		};

		return {
			mimeList,
			humanFormatList,
			form,
			previewImage,
			onFileInputChange,
			upload,
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
