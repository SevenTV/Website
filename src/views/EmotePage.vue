<template>
	<main>
		{{ id }}
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
	setup() {
		const route = useRoute();
		return {
			id: route.params.id,
		};
	},
});
</script>
