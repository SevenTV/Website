<template>
	<div ref="card" class="user-card">
		<div class="profile-banner">
			<!-- Profile Picture -->
			<span
				class="avatar"
				:style="{
					backgroundImage: `url('${user?.avatar_url}')`,
					borderColor: ConvertIntColorToHex(user?.style.color ?? 0),
				}"
			/>

			<span class="username" :style="{ color: ConvertIntColorToHex(user?.style.color ?? 0) }">{{
				usr?.display_name
			}}</span>
		</div>

		<!-- Display roles -->
		<div v-if="usr" class="user-roles">
			<UserRoleList :user="usr" />
		</div>

		<div class="user-actions">
			<div class="single-user-action">
				<IconButton
					:use-route="`/users/${user?.id}`"
					:tooltip="t('user.card.view_full_profile')"
					fa-icon="external-link-alt"
					:scale="1.5"
					@click="close"
				/>
			</div>
			<div v-for="a in actions" :key="a.tooltip" class="single-user-action">
				<IconButton v-if="a.condition()" :tooltip="a.tooltip" :fa-icon="a.icon" :scale="1.5"></IconButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GetUser, GetMinimalUser } from "@gql/users/user";
import { User } from "@structures/User";
import { useQuery } from "@vue/apollo-composable";
import { onMounted, PropType, ref } from "vue";
import { ConvertIntColorToHex } from "@structures/util/Color";
import { useActor } from "@store/actor";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { Permissions } from "@structures/Role";
import { onClickOutside } from "@vueuse/core";
import IconButton from "@components/utility/IconButton.vue";
import UserRoleList from "./UserRoleList.vue";

const { t } = useI18n();

const props = defineProps({
	user: Object as PropType<User | null>,
});

const emit = defineEmits(["close"]);

let ready = false;
setTimeout(() => (ready = true), 200);
const close = () => {
	if (!ready) {
		return;
	}

	emit("close");
};

const actorStore = useActor();
const { user: clientUser } = storeToRefs(actorStore);

// Fetch full user information
const usr = ref(props.user);
const { onResult } = useQuery<GetUser>(GetMinimalUser, { id: usr.value?.id });
onResult((res) => {
	usr.value = res.data.user;
	actions.value = [
		{
			tooltip: "Report User",
			icon: "flag",
			condition: () => {
				return clientUser.value ? User.HasPermission(clientUser.value, Permissions.CreateReport) : false;
			},
		},
		{
			tooltip: "Warn User",
			icon: "exclamation-triangle",
			condition: () => {
				return clientUser.value
					? User.HasPermission(clientUser.value, Permissions.ManageBans) &&
							User.ComparePrivilege(clientUser.value, usr.value as User)
					: false;
			},
		},
		{
			tooltip: "Ban User",
			icon: "gavel",
			condition: () => {
				return clientUser.value
					? User.HasPermission(clientUser.value, Permissions.ManageBans) &&
							User.ComparePrivilege(clientUser.value, usr.value as User)
					: false;
			},
		},
	];
});

const actions = ref([] as UserAction[]);

const card = ref<HTMLDivElement>();
onMounted(() => {
	if (card.value) {
		card.value.style.setProperty(
			"--user-card-role-border-color",
			usr.value?.style.color ? ConvertIntColorToHex(usr.value.style.color as number, 1) : "inherit",
		);
	}
});

onClickOutside(card, close);
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
