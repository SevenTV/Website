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
			<h3>ROLES</h3>
			<div class="user-role-list">
				<div
					v-for="role of roles"
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
			<div v-if="user" sign-up-date>
				<font-awesome-icon :icon="['fas', 'calendar-alt']" />
				<span>Joined {{ createdAt }}</span>
			</div>
		</div>

		<!-- Connections -->
		<div class="user-connections">
			<div
				v-for="conn of connections ?? []"
				:key="conn.id"
				class="user-conn"
				:platform="conn.platform"
				@click="edit(conn.id)"
			>
				<div class="conn-heading">
					<h4>
						<span>
							<font-awesome-icon v-if="conn.platform === 'TWITCH'" :icon="['fab', 'twitch']" />
							<font-awesome-icon v-if="conn.platform === 'YOUTUBE'" :icon="['fab', 'youtube']" />
							<font-awesome-icon v-if="conn.platform === 'DISCORD'" :icon="['fab', 'discord']" />
						</span>
						<span>{{ conn.display_name }}</span>
					</h4>
					<!-- Edit Icon -->
					<div>
						<Tooltip text="Open profile (external)" @click.stop>
							<font-awesome-icon :icon="['fas', 'external-link-alt']" />
						</Tooltip>
						<Tooltip v-if="actorCanEdit" text="Edit Connection">
							<font-awesome-icon :icon="['fas', 'cog']" />
						</Tooltip>
					</div>
				</div>

				<!-- Assigned Set? -->
				<div class="conn-state">
					<div selector="assigned-set"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { useActorStore } from "@/store/actor";
import { User } from "@/structures/User";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { useModal } from "@/store/modal";
import UserTag from "@/components/utility/UserTag.vue";
import formatDate from "date-fns/fp/format";
import ModalConnectionEditor from "@/components/modal/ModalConnectionEditor.vue";
import Tooltip from "@/components/utility/Tooltip.vue";

const props = defineProps({
	user: {
		type: Object as PropType<User | null>,
	},
	loading: Boolean,
});

const actor = useActorStore();
const user = computed(() => props.user);
const roles = computed(() => (user.value?.roles ?? []).filter((r) => !r.invisible));
const connections = computed(() =>
	user.value?.connections?.map((c) => ({
		...c,
	})),
);
const createdAt = computed(() =>
	user.value?.created_at ? formatDate("MMMM d, y")(new Date(user.value.created_at ?? 0)) : "",
);

const actorCanEdit = computed(() => actor.mayEditUser(user.value, true));

// Connection editor modal
const modal = useModal();
const edit = (connID: string) => {
	modal.open("connection-editor", {
		component: ModalConnectionEditor,
		props: { user: user, connectionID: connID },
		events: {},
	});
};
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-details";
</style>
