<template>
	<div ref="card" v-click-outside="close" class="user-card">
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
				<span>{{ role.name }}</span>
			</div>
		</div>

		<div class="user-actions">
			<IconButton
				:use-route="`/users/${user?.id}`"
				:tooltip="t('user.card.view_full_profile')"
				fa-icon="external-link-alt"
				:scale="1.5"
				@click="emit('close')"
			></IconButton>
			<div v-for="a in actions" :key="a.tooltip" class="single-user-action">
				<IconButton v-if="a.condition()" :tooltip="a.tooltip" :fa-icon="a.icon" :scale="1.5"></IconButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GetUser, GetUserForCard } from "@gql/users/user";
import { User } from "@structures/User";
import { useQuery } from "@vue/apollo-composable";
import { computed, onMounted, PropType, ref } from "vue";
import { ConvertIntColorToHex } from "@structures/util/Color";
import { useActorStore } from "@store/actor";
import { storeToRefs } from "pinia";
import { Permissions } from "@structures/Role";
import IconButton from "@components/utility/IconButton.vue";
import { useI18n } from "vue-i18n";

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

const actorStore = useActorStore();
const { user: clientUser } = storeToRefs(actorStore);

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
				return clientUser.value ? User.HasPermission(clientUser.value, Permissions.ReportCreate) : false;
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
const roles = computed(() => (usr.value?.roles ?? []).filter((r) => !r.invisible));
const actions = ref([] as UserAction[]);

const card = ref<HTMLDivElement>();
onMounted(() => {
	if (card.value) {
		card.value.style.setProperty(
			"--user-card-role-border-color",
			usr.value?.tag_color ? ConvertIntColorToHex(usr.value.tag_color as number, 1) : "inherit",
		);
	}
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
