<template>
	<div>
		<slot v-if="shouldRender" />
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";

const shouldRender = ref(false);
nextTick(() => {
	shouldRender.value = true;
});
</script>
