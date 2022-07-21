<template>
	<main v-if="user" class="user-settings">
		<div class="user-settings-form">
			<h2>{{ t("user.settings.section_profile") }}</h2>
			<div class="user-settings-section">
				<UserProfileSettings :form="form" :user="user" @set-field="onFormUpdate" />
			</div>
		</div>

		<!-- Submit Button -->
		<div class="user-settings-actions">
			<Button
				class="submit-button"
				:disabled="uploading || pristine"
				:label="t('common.reset').toUpperCase()"
				color="warning"
				@click="() => reset()"
			/>
			<Button
				class="submit-button"
				:disabled="uploading || pristine"
				:label="t('common.save_changes').toUpperCase()"
				color="primary"
				@click="submit"
			/>
		</div>
	</main>
</template>

<script setup lang="ts">
import { GetUser } from "@/assets/gql/users/user";
import { useActorStore } from "@/store/actor";
import { LocalStorageKeys } from "@/store/lskeys";
import { User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { reactive, ref } from "vue";
import { FormType } from "./FormType";
import UserProfileSettings from "./UserProfileSettings.vue";
import Button from "@/components/utility/Button.vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	userID: string;
	userData?: string;
}>();

const { t } = useI18n();

const pristine = ref(true);
const form = reactive({
	username: null,
	display_name: null,
	show_paint: null,
	profile_picture: null,
} as FormType);

const onFormUpdate = <T extends keyof FormType>(key: T, value: FormType[T]) => {
	form[key] = value;
	pristine.value = false;
};

const user = ref<User>(props.userData ? JSON.parse(props.userData) : null);

const { onResult } = useQuery<GetUser>(GetUser, { id: props.userID });

onResult((res) => {
	if (!res.data.user) {
		return;
	}

	user.value = res.data.user;
});

const actor = useActorStore();

const uploading = ref(false);
const submit = () => {
	if (!actor.user || uploading.value) {
		return; // user must be logged in to do this
	}

	uploading.value = true;

	const tgt = actor.user.id === user.value.id ? "@me" : user.value.id;

	// Upload profile pic
	if (form.profile_picture) {
		const req = new XMLHttpRequest();
		req.open("PUT", `${import.meta.env.VITE_APP_API_REST as string}/users/${tgt}/profile-picture`, true);
		req.setRequestHeader("Authorization", `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`);
		req.setRequestHeader("Content-Length", form.profile_picture.byteLength.toString(10));
		// req.upload.onprogress = (progress) => {}; // TODO: show upload progress
		req.onload = () => {
			if (req.status !== 200) {
				// TODO: show error
			}

			uploading.value = false;
		};

		req.send(form.profile_picture);
	}
};

// Reset some or all form fields to their default value
const reset = (fields?: (keyof FormType)[]) => {
	const fieldList = fields?.length ? fields : (Object.keys(form) as unknown as (keyof FormType)[]);

	for (const f of fieldList) {
		form[f] = null;
	}
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.user-settings > .user-settings-form {
	height: 100%;
	width: calc(100% - 3em);

	@include themify() {
		> h2 {
			color: mix(themed("backgroundColor"), themed("color"), 33%);
			text-transform: uppercase;
			font-size: 1.25em;
			padding-bottom: 0.25em;
			border-bottom: 1px solid currentColor;
		}
	}

	> h2 {
		margin: 0.5em;
	}

	> .user-settings-section {
		margin-left: 1em;
		margin-right: 1em;
	}
}

.user-settings-actions {
	display: flex;
	width: 100%;

	> button {
		border-radius: 0;

		&:nth-child(1) {
			width: 25%;
		}
		&:nth-child(2) {
			width: 75%;
		}
	}
}
</style>
