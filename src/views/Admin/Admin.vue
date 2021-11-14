<template>
	<main v-if="hasAccess">
		<div class="admin">
			<div class="sidebar" :class="{ open: sidebarOpen }">
				<!-- Greet the user -->
				<h4 class="greetings">
					<span>Hello, </span>
					<UserTag :hide-avatar="true" :user="clientUser" />
					<span>!</span>
				</h4>
				<div class="sidebar-small-toggle" @click="sidebarOpen = !sidebarOpen">
					<IconButton tooltip="Toggle Sidebar" fa-icon="bars" />
				</div>

				<div class="sidebar-content">
					<AdminSidebar />
				</div>
			</div>

			<div class="content">
				<router-view />
			</div>
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
import IconButton from "@/components/utility/IconButton.vue";
import AdminSidebar from "./AdminSidebar.vue";

export default defineComponent({
	components: { NotFound, UserTag, IconButton, AdminSidebar },
	name: "Home",
	setup() {
		// Check permissions
		const store = useStore();
		const clientUser = computed(() => store.getters?.clientUser as User);
		const hasAccess = computed(() => UserIsPrivileged(clientUser.value));
		useHead({
			title: "Administration - 7TV",
		});

		const sidebarOpen = ref(false);
		return {
			clientUser,
			hasAccess,
			sidebarOpen,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin.scss";
</style>
