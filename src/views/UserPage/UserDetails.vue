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
		<div v-if="user && roles.length" class="user-roles">
			<h3 class="user-details-section">{{ t("user.roles").toUpperCase() }}</h3>
			<UserRoleList :user="user" />
		</div>

		<div v-if="user && actorCanManageProfile && actorCanEdit" class="settings-btn" :style="{ marginBottom: '1em' }">
			<router-link
				:to="{ name: 'UserSettings', params: { userID: user.id } }"
				class="user-button unstyled-link"
				color="primary"
			>
				{{ t("user.settings.button") }}
			</router-link>
			<div v-if="actor.id && actor.id === user.id" class="user-button" color="primary" @click="logout">
				{{ t("user.settings.sign_out") }}
			</div>
		</div>

		<!-- Sign Up Date -->
		<div class="user-metadata">
			<div v-if="user" sign-up-date>
				<Icon icon="calendar-alt" />
				<span> {{ t("user.joined_at", [createdAt]) }}</span>
			</div>
		</div>

		<!-- Connections -->
		<div v-if="user && connections?.length" class="user-connections">
			<h3 class="user-details-section">
				{{ t("user.connections", hasNonChannelAccounts ? 2 : 1).toUpperCase() }}
			</h3>
			<div
				v-for="conn of connections ?? []"
				:key="conn.id"
				class="user-conn"
				:platform="conn.platform"
				@click="edit(conn.id)"
			>
				<div class="conn-heading">
					<h4>
						<span selector="icon">
							<Icon v-if="conn.platform === 'TWITCH'" lib="fab" icon="twitch" />
							<Icon v-if="conn.platform === 'YOUTUBE'" lib="fab" icon="youtube" />
							<Icon v-if="conn.platform === 'DISCORD'" lib="fab" icon="discord" />
						</span>

						<span selector="label">
							<p>{{ conn.display_name || conn.platform }}</p>
							<span v-if="user.emote_sets?.length">
								{{ user.emote_sets.find((es) => es.id === conn.emote_set_id)?.name }}
							</span>
						</span>
					</h4>
					<!-- Edit Icon -->
					<div>
						<Icon
							v-if="conn.emote_capacity > 0"
							v-tooltip="t('user.open_external_profile')"
							size="lg"
							icon="external-link-alt"
							@click.stop="openExternalProfile(conn)"
						/>
						<Icon v-if="actorCanEdit" v-tooltip="t('user.edit_connection')" size="lg" icon="cog" />
					</div>
				</div>
			</div>

			<!-- Connector -->
			<div v-if="actorCanEdit && connections" class="user-connector">
				<h3 class="user-details-section">{{ t("user.new_connections").toUpperCase() }}</h3>
				<div
					v-if="!connections.find((c) => c.platform === 'TWITCH')"
					class="connect-button with-gradient"
					platform="TWITCH"
					@click="linkAccount('TWITCH')"
				>
					<Icon lib="fab" icon="twitch" />
				</div>

				<div
					v-if="!connections.find((c) => c.platform === 'DISCORD')"
					class="connect-button with-gradient"
					platform="DISCORD"
					@click="linkAccount('DISCORD')"
				>
					<Icon lib="fab" icon="discord" />
				</div>

				<div
					v-if="!connections.find((c) => c.platform === 'YOUTUBE')"
					class="connect-button with-gradient"
					platform="YOUTUBE"
					@click="linkAccount('YOUTUBE')"
				>
					<Icon lib="fab" icon="youtube" />
				</div>
			</div>

			<!-- Editors -->
			<div v-if="user.editors?.length || actorCanManageEditors" class="user-editors">
				<h3 class="user-details-section">{{ t("user.editors").toUpperCase() }}</h3>
				<div
					v-for="ed of user.editors"
					:key="ed.id"
					class="editor"
					:style="{
						backgroundColor: ed.user?.style.color
							? ConvertIntColorToHex(ed.user?.style.color ?? 0, 0.25)
							: '',
					}"
				>
					<UserTag :clickable="true" scale="1.5em" :user="ed.user" />

					<Icon
						v-if="actorCanManageEditors"
						icon="user-pen"
						class="revoke-editor"
						@click="modifyEditor(ed)"
					/>
				</div>
				<div v-if="actorCanManageEditors" v-wave class="editor add-editor-button" @click="modifyEditor()">
					<Icon icon="user-plus" />
					<span>{{ t("user.add_editor") }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { useActor } from "@store/actor";
import { User } from "@structures/User";
import { ConvertIntColorToHex } from "@structures/util/Color";
import { useModal } from "@store/modal";
import { useI18n } from "vue-i18n";
import { Permissions } from "@/structures/Role";
import { LocalStorageKeys } from "@/store/lskeys";
import UserTag from "@components/utility/UserTag.vue";
import formatDate from "date-fns/fp/format";
import ModalConnectionEditor from "@components/modal/ModalConnectionEditor.vue";
import Icon from "@/components/utility/Icon.vue";
import UserEditorModal from "./UserEditorModal.vue";
import UserRoleList from "@/components/utility/UserRoleList.vue";

const { t } = useI18n();

const props = defineProps({
	user: {
		type: Object as PropType<User | null>,
	},
	loading: Boolean,
});

const actor = useActor();
const user = computed(() => props.user);
const roles = computed(() => (User.GetRoles(user.value ?? null) ?? []).filter((r) => !r.invisible));
const connections = computed(() =>
	user.value?.connections?.map((c) => ({
		...c,
	})),
);
const createdAt = computed(() =>
	user.value?.created_at ? formatDate("MMMM d, y")(new Date(user.value.created_at ?? 0)) : "",
);

const actorCanEdit = computed(() =>
	!user.value ? false : actor.hasEditorPermission(user.value, User.EditorPermission.ManageEmoteSets),
);

const actorCanManageProfile = computed(
	() =>
		User.HasPermission(actor.user, Permissions.ManageUsers) ||
		(user.value && actor.user && user.value.id === actor.user.id),
);

const actorCanManageEditors = computed(
	() => user.value && actor.hasEditorPermission(user.value, User.EditorPermission.ManageEditors),
);

const openExternalProfile = (conn: User.Connection) => {
	let url = "";

	switch (conn.platform) {
		case "TWITCH":
			url = `https://twitch.tv/${conn.username}`;
			break;
		case "YOUTUBE":
			url = `https://youtube.com/channel/${conn.id}`;
			break;

		default:
			break;
	}

	window.open(`${url}?referrer=${document.location.host}`, "_blank");
};

// Connection editor modal
const modal = useModal();
const edit = (connID: string) => {
	if (!actorCanEdit.value) {
		return;
	}

	modal.open("connection-editor", {
		component: ModalConnectionEditor,
		props: { user: user, connectionID: connID },
		events: {},
	});
};

const hasNonChannelAccounts = computed(() => connections.value?.some((c) => ["DISCORD"].includes(c.platform)));

const linkAccount = (platform: User.Connection.Platform) => {
	if (platform === "YOUTUBE") {
		window.open(import.meta.env.VITE_APP_OLD + "/link-youtube", "_blank");
		return;
	}

	window.open(
		`${import.meta.env.VITE_APP_API_REST}/auth/${platform.toLowerCase()}?token=${localStorage.getItem(
			LocalStorageKeys.TOKEN,
		)}`,
		"7TVOAuth2",
		"_blank, width=850, height=650, menubar=no, location=no",
	);
};

const modifyEditor = (editor?: User.Editor) => {
	modal.open("modify-editor", {
		component: UserEditorModal,
		props: { user, editor },
		events: {
			editors: (newList: User.Editor[]) => {
				if (!user.value) {
					return;
				}

				user.value.editors = newList;
			},
		},
	});
};

const logout = () => {
	localStorage.removeItem(LocalStorageKeys.TOKEN);
	actor.user = null;
};
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-details.scss";
</style>
