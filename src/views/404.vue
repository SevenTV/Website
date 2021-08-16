<template>
	<main class="not-found">
		<div v-if="mode === 'troll-despair'">
			<TrollDespair class="troll" />
			<!-- <img src="@/assets/trolldespair.webp" /> -->
			<span>
				<h1>we couldn't find it</h1>
			</span>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue';
import { useHead } from '@vueuse/head';
import { useStore } from '@/store';
import TrollDespair from '@/components/base/TrollDespair.vue';

export default defineComponent({
	components: { TrollDespair },
	setup() {
		const store = useStore();

		let mode = 'troll-despair';

		store.commit('SET_NOT_FOUND_MODE', mode);

		onBeforeUnmount(() => {
			store.commit('SET_NOT_FOUND_MODE', '');
		});

		useHead({
			title: '7TV | Not Found',
		});

		return {
			mode,
		};
	},
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/404.scss';
</style>
