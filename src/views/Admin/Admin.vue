<template>
	<main v-if="hasAccess">
		<div class="admin">
			<div class="sidebar" :class="{ open: sidebarOpen }">
				<div class="content-edge" at="top-left" />
				<div class="content-edge" at="top-right" />
				<div class="content-edge" at="bottom-left" />
				<div class="content-edge" at="bottom-right" />

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

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { ref } from "vue";
import { useActorStore } from "@store/actor";
import { User } from "@structures/User";
import { computed } from "vue";
import NotFound from "@views/404.vue";
import UserTag from "@components/utility/UserTag.vue";
import IconButton from "@components/utility/IconButton.vue";
import AdminSidebar from "@views/Admin/AdminSidebar.vue";

// Check permissions
const actorStore = useActorStore();
const clientUser = computed(() => actorStore.user);
const hasAccess = computed(() => (clientUser.value ? User.IsPrivileged(clientUser.value) : false));
useHead({
	title: "Administration - 7TV",
});

const sidebarOpen = ref(false);
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin.scss";
</style>
