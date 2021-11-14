<template>
	<template>
		<div class="home">Hello World</div>
	</template>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { User, UserIsPrivileged } from "@/structures/User";
import { computed } from "vue-demi";

export default defineComponent({
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
