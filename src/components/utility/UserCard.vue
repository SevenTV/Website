<template>
	<div class="user-card" v-click-outside="close">
		<div class="profile-banner">
			<!-- Profile Picture -->
			<span
				class="avatar"
				:style="{
					backgroundImage: `url('${user?.avatar_url}')`,
					borderColor: ConvertIntColorToHex(user?.tag_color ?? 0),
				}"
			/>

			<span class="username" :style="{ color: ConvertIntColorToHex(user?.tag_color ?? 0) }">{{
				usr?.display_name
			}}</span>
		</div>

		<!-- Display roles -->
		<div class="user-roles">
			<div
				class="user-role-chip"
				v-for="role in roles"
				:key="role.id"
				:style="{ color: ConvertIntColorToHex(role.color) }"
			>
				<span>{{ role.name }}</span>
			</div>
		</div>

		<div class="user-actions">
			<IconButton
				:use-route="`/users/${user?.id}`"
				tooltip="View Full Profile"
				fa-icon="external-link-alt"
				:scale="1.5"
			></IconButton>
			<div class="single-user-action" v-for="a in actions" :key="a.tooltip">
				<IconButton v-if="a.condition()" :tooltip="a.tooltip" :fa-icon="a.icon" :scale="1.5"></IconButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { GetUser, GetUserForCard } from "@/assets/gql/users/user";
import { CompareUserPrivilege, ConvertIntColorToHex, User, UserHasPermission } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, PropType, ref } from "vue";
import { useStore } from "@/store";
import IconButton from "@components/utility/IconButton.vue";
import { RolePermissions } from "@/structures/Role";

export default defineComponent({
	components: { IconButton },
	props: {
		user: Object as PropType<User | null>,
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setup(props, { emit }) {
		let ready = false;
		setTimeout(() => (ready = true), 200);
		const close = () => {
			if (!ready) {
				return;
			}
			emit("close");
		};

		const store = useStore();
		const clientUser = computed(() => store.getters.clientUser as User);

		// Fetch full user information
		const usr = ref(props.user);
		const { onResult } = useQuery<GetUser>(GetUserForCard, { id: usr.value?.id });
		onResult((res) => {
			usr.value = res.data.user;
			actions.value = [
				{
					tooltip: "Report User",
					icon: "flag",
					condition: () => {
						return UserHasPermission(clientUser.value, RolePermissions.ReportCreate);
					},
				},
				{
					tooltip: "Warn User",
					icon: "exclamation-triangle",
					condition: () => {
						return (
							UserHasPermission(clientUser.value, RolePermissions.ManageBans) &&
							CompareUserPrivilege(clientUser.value, usr.value as User)
						);
					},
				},
				{
					tooltip: "Ban User",
					icon: "gavel",
					condition: () => {
						return (
							UserHasPermission(clientUser.value, RolePermissions.ManageBans) &&
							CompareUserPrivilege(clientUser.value, usr.value as User)
						);
					},
				},
			];
		});
		const roles = computed(() => usr.value?.roles ?? []);
		const actions = ref([] as UserAction[]);

		return {
			usr,
			roles,
			actions,
			ConvertIntColorToHex,
			close,
		};
	},
});

interface UserAction {
	tooltip: string;
	icon: string;
	condition: () => boolean;
	click?: () => void;
}
</script>

<style lang="scss" scoped>
@import "@scss/components/user-card.scss";
</style>
