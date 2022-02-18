<template>
	<div class="user-details">
		<!-- User Card -->
		<div class="user-card-wrapper">
			<div class="user-card">
				<div selector="profile-picture">
					<UserTag :user="user" scale="3em" text-scale="0em" />
				</div>
				<div selector="tag">
					<UserTag :user="user" :hide-avatar="true" />
					<p selector="bio">{{ user?.biography }}</p>
				</div>
			</div>
		</div>

		<div :style="{ height: '6em' }"></div>
		<!-- Role List -->
		<div v-if="user?.roles.length" class="user-roles">
			<h3>ROLES</h3>
			<div class="user-role-list">
				<div
					v-for="role of user?.roles"
					:key="role.id"
					class="user-role-chip"
					:style="{ color: ConvertIntColorToHex(role.color) }"
				>
					{{ role.name }}
				</div>
			</div>
		</div>

		<!-- Sign Up Date -->
		<div class="user-metadata">
			<div sign-up-date>
				<font-awesome-icon :icon="['fas', 'calendar-alt']" />
				<span>Joined {{ createdAt }}</span>
			</div>
		</div>

		<!-- Connections -->
		<div class="user-connections">
			<div v-for="conn of connections ?? []" :key="conn.id" class="user-conn" :platform="conn.platform">
				<h4 class="conn-title">
					<span>{{ conn.platform.toLowerCase() }}</span>
					-
					<span>{{ conn.display_name }}</span>
				</h4>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { User } from "@/structures/User";
import UserTag from "@/components/utility/UserTag.vue";
import formatDate from "date-fns/fp/format";
import { ConvertIntColorToHex } from "@/structures/util/Color";

export default defineComponent({
	components: { UserTag },
	props: {
		user: {
			type: Object as PropType<User | null>,
			required: true,
		},
	},
	setup(props) {
		const user = computed(() => props.user);
		const connections = computed(() =>
			user.value?.connections?.map((c) => ({
				...c,
			}))
		);
		const createdAt = computed(() =>
			user.value?.created_at ? formatDate("MMMM d, y")(new Date(user.value.created_at ?? 0)) : ""
		);
		return {
			connections,
			createdAt,
			ConvertIntColorToHex,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-details";
</style>
