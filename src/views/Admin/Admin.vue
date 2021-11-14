<template>
	<main v-if="hasAccess">
		<div class="home">Hello World</div>
	</main>

	<!-- 404 if no access -->
	<main v-else>
		<NotFound />
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { User, UserIsPrivileged } from "@/structures/User";
import { computed } from "vue-demi";
import NotFound from "../404.vue";

export default defineComponent({
	components: { NotFound },
	name: "Home",
	setup() {
		// Check permissions
		const store = useStore();
		const clientUser = computed(() => store.getters?.clientUser as User);
		const hasAccess = computed(() => UserIsPrivileged(clientUser.value));
		useHead({
			title: "Administration - 7TV",
		});
		return {
			hasAccess,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin.scss";
</style>
