<template>
	<main class="not-found">
		<div v-if="mode === 'troll-despair'">
			<TrollDespair class="troll" />
			<span>
				<h1>{{ t("notFound.troll_despair") }}</h1>
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

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { useHead } from "@vueuse/head";
import { NotFoundMode, useStore } from "@store/main";
import PotFriend from "@/components/base/PotFriend.vue";
import Button from "@/components/utility/Button.vue";
import TrollDespair from "@base/TrollDespair.vue";

const { t } = useI18n();
const store = useStore();
const modes = ["troll-despair", "pot-friend"] as NotFoundMode[];
const mode = modes[Math.floor(Math.random() * modes.length)];

store.setNotFoundMode(mode);

onBeforeUnmount(() => {
	store.setNotFoundMode(null);
});

useHead({
	title: "Not Found - 7TV",
});
</script>

<style lang="scss" scoped>
@import "@scss/404.scss";
</style>
