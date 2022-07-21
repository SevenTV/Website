<template>
	<main class="user-profile-settings">
		<!-- Username / Display name -->
		<div>
			<FormKit
				:disabled="true"
				:label="t('user.settings.username')"
				type="text"
				:value="form.username ?? user.username"
			/>
			<FormKit
				:disabled="true"
				:label="t('user.settings.display_name')"
				type="text"
				:value="form.display_name ?? user.display_name"
			/>
		</div>

		<!-- Show Paint on site -->
		<div></div>

		<!-- Profile Picture -->
		<div selector="profile-picture">
			<div @drop.prevent="onDropFile" @dragover.prevent>
				<p>{{ t("user.settings.profile_picture") }}</p>

				<input id="file-upload" hidden type="file" :accept="mime" @change="onFileInput" />
				<label for="file-upload">
					<img ref="previewImage" />
				</label>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { User } from "@/structures/User";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { FormType } from "./FormType";

const emit = defineEmits<{
	<T extends keyof FormType>(e: "set-field", key: T, value: FormType[T]): void;
}>();

const props = defineProps<{
	user: User;
	form: FormType;
}>();

const { t } = useI18n();

const previewImage = ref<HTMLImageElement | null>(null);
const mime = "image/avif,image/webp,image/gif,image/apng,image/png,image/jpeg";

const onDropFile = (event: DragEvent) => {
	const file = event.dataTransfer?.files[0] as File;
	if (file) {
		handleFile(file);
	}
};

// onFileInput listens for changes on the file input for the profile picture
const onFileInput = (evt: Event) => {
	const tgt = evt.target as HTMLInputElement;
	const file = tgt.files?.[0] as File;

	handleFile(file);
};

// handleFile handles a file sent through the file input for the profile picture
const handleFile = async (file: File) => {
	const url = URL.createObjectURL(file);
	if (previewImage.value) {
		previewImage.value.setAttribute("ogsrc", previewImage.value.src);
		previewImage.value.src = url;
		previewImage.value.onload = async () => {
			if (!previewImage.value) {
				return;
			}
			URL.revokeObjectURL(url);

			const w = previewImage.value.naturalWidth;
			const h = previewImage.value.naturalHeight;
			if (w > 1000 || h > 1000) {
				alert("Image is too large (must be less than 1000x1000)");
				previewImage.value.src = previewImage.value.getAttribute("ogsrc") as string;
				previewImage.value.removeAttribute("ogsrc");
			} else {
				emit("set-field", "profile_picture", await file.arrayBuffer());
			}
		};
	}
};

// Set defaults when the component mounts
onMounted(() => {
	if (!previewImage.value) {
		return;
	}

	previewImage.value.src = "https:" + props.user?.avatar_url;
});

const done = watch(props.form, (form) => {
	if (!form.profile_picture && previewImage.value) {
		previewImage.value.src = previewImage.value.getAttribute("ogsrc") ?? "";
	}
});

onUnmounted(() => done());
</script>

<style scoped lang="scss">
main.user-profile-settings {
	display: flex;
	justify-content: space-between;

	> div[selector="profile-picture"] {
		> div {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		> div > p {
			font-weight: 600;
		}

		> div > label {
			display: block;
			margin-top: 0.5em;
			user-select: none;
			cursor: pointer;

			> img {
				border: 0.15em dashed currentColor;
				width: 6rem;
				height: 6rem;
				border-radius: 50%;
				pointer-events: none;
			}
		}
	}
}
</style>
