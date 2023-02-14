<template>
	<div ref="card" class="user-card">
		<div class="profile-banner">
			<!-- Profile Picture -->
			<span
				class="avatar"
				:style="{
					backgroundImage: `url('${user?.avatar_url}')`,
					borderColor: ConvertDecimalToHex(user?.style.color ?? 0),
				}"
			/>

			<UserTag v-if="user" :user="user" text-scale="1rem" :hide-avatar="true" :cosmetics="true" />
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
import { PropType, defineAsyncComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useActor } from "@store/actor";
import { GetMinimalUser, GetUser } from "@/apollo/query/user.query";
import { Permissions } from "@/structures/Role";
import { User } from "@/structures/User";
import { ConvertDecimalToHex } from "@/structures/util/Color";
import IconButton from "@/components/utility/IconButton.vue";
import UserTag from "./UserTag.vue";

const UserRoleList = defineAsyncComponent(() => import("@/components/utility/UserRoleList.vue"));

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
			usr.value?.style.color ? ConvertDecimalToHex(usr.value.style.color as number) : "inherit",
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
@import "@scss/themes.scss";

.user-card {
	display: flex;
	flex-direction: column;
	align-content: space-between;
	min-width: 16rem;
	max-width: 20em;
	margin-top: 2rem;
	border-radius: 0.3rem;
	padding: 0.5em;
	padding-right: 1rem;

	@include themify() {
		background-color: transparentize(darken(themed("backgroundColor"), 6), 0.25);
		outline: 0.1rem solid transparentize(darken(themed("color"), 6), 0.75);
	}

	backdrop-filter: blur(3rem);

	.profile-banner {
		display: flex;
		align-items: center;
		padding: 0.5rem;
	}

	.profile-banner > .avatar {
		vertical-align: middle;
		display: inline-block;
		background-size: contain;
		border-style: solid;
		border-width: 0.05rem;
		border-radius: 50%;
		margin-right: 0.5rem;
		width: 3rem;
		height: 3rem;
	}

	.profile-banner > .username {
		font-size: 1rem;
	}

	.user-roles {
		display: flex;

		.user-role-chip {
			border-radius: 0.3rem;
			margin: 0.25rem;
			padding: 0.5rem;
			user-select: none;
			span {
				font-size: 1rem;
				color: inherit;
			}
			&.hidden {
				display: none;
			}
			@include themify() {
				background-color: themed("backgroundColor");
			}
		}
	}

	.user-actions {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, 2rem);
		justify-content: center;
	}
}
</style>
