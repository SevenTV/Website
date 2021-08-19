<template>
	<div class="emote-card">
		<span>{{ emote.name }}</span>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: ["emote"],
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/emote-card.scss";
</style>
