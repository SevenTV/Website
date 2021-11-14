<template>
	<main v-if="hasAccess">
		<div class="admin">
			<div class="sidebar" :class="{ collapsed: sidebarCollapsed }">
				<!-- Greet the user -->
				<h4 class="greetings">
					<span>Hello, </span>
					<UserTag :hide-avatar="true" :user="clientUser" />
					<span>!</span>
				</h4>
			</div>

			<div class="content"></div>
		</div>
	</main>

	<!-- 404 if no access -->
	<main v-else>
		<NotFound />
	</main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent, ref } from "vue-demi";
import { useStore } from "@/store";
import { User, UserIsPrivileged } from "@/structures/User";
import { computed } from "vue-demi";
import NotFound from "../404.vue";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: { NotFound, UserTag },
	name: "Home",
	setup() {
		// Check permissions
		const store = useStore();
		const clientUser = computed(() => store.getters?.clientUser as User);
		const hasAccess = computed(() => UserIsPrivileged(clientUser.value));
		useHead({
			title: "Administration - 7TV",
		});

		const sidebarCollapsed = ref(false);
		return {
			clientUser,
			hasAccess,
			sidebarCollapsed,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin.scss";
</style>
