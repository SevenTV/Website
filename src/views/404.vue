<template>
	<main class="not-found">
		<div v-if="mode === 'troll-despair'">
			<TrollDespair class="troll" />
			<span>
				<h1>{{ t("notFound.troll_despair") }}</h1>
			</span>
		</div>
		<div v-else-if="mode === 'doctor-wtf'">
			<DoctorWTF class="doctor-wtf" />
			<span>
				<h1>{{ t("notFound.doctor_wtf") }}</h1>
			</span>
		</div>

		<Button color="primary" label="Go Back" use-route="../" />
	</main>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { useHead } from "@vueuse/head";
import { NotFoundMode, useStore } from "@/store/main";
import { useI18n } from "vue-i18n";
import TrollDespair from "@base/TrollDespair.vue";
import Button from "@/components/utility/Button.vue";
import DoctorWTF from "@/components/base/DoctorWTF.vue";

export default defineComponent({
	components: { TrollDespair, Button, DoctorWTF },
	setup() {
		const store = useStore();
		const { t } = useI18n();
		const modes = ["doctor-wtf", "troll-despair"] as NotFoundMode[];
		const mode = modes[Math.floor(Math.random() * modes.length)];

		store.SET_NOT_FOUND_MODE(mode);

		onBeforeUnmount(() => {
			store.SET_NOT_FOUND_MODE("");
		});

		useHead({
			title: "Not Found - 7TV",
		});

		return {
			mode,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/404.scss";
</style>
