<template>
	<main v-if="route.meta.title" class="help">
		<RouterView />
	</main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
