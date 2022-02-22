<template>
	<div v-click-outside="close" class="user-card">
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
				v-for="role in roles"
				:key="role.id"
				class="user-role-chip"
				:style="{ color: ConvertIntColorToHex(role.color) }"
			>
				<span>{{ role.name }} {{ ConvertIntColorToHex(role.color) }}</span>
			</div>
		</div>

		<div class="user-actions">
			<IconButton
				:use-route="`/users/${user?.id}`"
				tooltip="View Full Profile"
				fa-icon="external-link-alt"
				:scale="1.5"
			></IconButton>
			<div v-for="a in actions" :key="a.tooltip" class="single-user-action">
				<IconButton v-if="a.condition()" :tooltip="a.tooltip" :fa-icon="a.icon" :scale="1.5"></IconButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { GetUser, GetUserForCard } from "@/assets/gql/users/user";
import { User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, PropType, ref } from "vue";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { useActorStore } from "@/store/actor";
import { Permissions } from "@/structures/Role";
import IconButton from "@components/utility/IconButton.vue";

export default defineComponent({
	components: { IconButton },
	props: {
		user: Object as PropType<User | null>,
	},
	emits: ["close"],
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

		const actorStore = useActorStore();
		const clientUser = computed(() => actorStore.getUser);

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
						return User.HasPermission(clientUser.value, Permissions.ReportCreate);
					},
				},
				{
					tooltip: "Warn User",
					icon: "exclamation-triangle",
					condition: () => {
						return (
							User.HasPermission(clientUser.value, Permissions.ManageBans) &&
							User.ComparePrivilege(clientUser.value, usr.value as User)
						);
					},
				},
				{
					tooltip: "Ban User",
					icon: "gavel",
					condition: () => {
						return (
							User.HasPermission(clientUser.value, Permissions.ManageBans) &&
							User.ComparePrivilege(clientUser.value, usr.value as User)
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
