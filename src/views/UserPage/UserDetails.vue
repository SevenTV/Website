<template>
	<div class="user-details">
		<!-- Role List -->
		<div class="user-roles">
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
import { ConvertIntColorToHex, User } from "@/structures/User";
import formatDate from "date-fns/fp/format";

export default defineComponent({
	props: {
		user: {
			type: Object as PropType<User | null>,
			required: true,
		},
	},
	setup(props) {
		const connections = computed(() =>
			props.user?.connections.map((c) => ({
				...c,
				parsedData: JSON.parse(c.data),
			}))
		);

		const createdAt = computed(() => formatDate("MMMM d, y")(new Date(props.user?.created_at ?? 0)));
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
