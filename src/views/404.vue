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
		<div v-else-if="mode === 'pot-friend'">
			<PotFriend class="pot-friend" />
			<span>
				<h1>{{ t("notFound.pot_friend") }}</h1>
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
import PotFriend from "@/components/base/PotFriend.vue";

export default defineComponent({
	components: { TrollDespair, Button, DoctorWTF, PotFriend },
	setup() {
		const store = useStore();
		const { t } = useI18n();
		const modes = ["doctor-wtf", "troll-despair", "pot-friend"] as NotFoundMode[];
		const mode = modes[Math.floor(Math.random() * modes.length)];

		store.setNotFoundMode(mode);

		onBeforeUnmount(() => {
			store.setNotFoundMode(null);
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
