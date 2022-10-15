<template>
	<ModalBase v-if="connection" width="32em" @close="emit('close')">
		<template #heading>
			<h3>{{ User.getStyledPlatformName(connection.platform) }} Connection - {{ connection.display_name }}</h3>
		</template>

		<template #content>
			<div class="connection-editor">
				<!-- Set Selector -->
				<div v-if="connection.emote_capacity" selector="set-selector">
					<h3>Assigned Emote Set</h3>
					<div selector="owned-sets">
						<div
							v-for="set of ownedSets"
							:key="set.id"
							:selected="set.id === connection.emote_set_id"
							@click="changeAssignedSet(set.id)"
						>
							<span>{{ set.name }}</span>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="connection-buttons">
				<span />
				<span selector="btn-unlink" @click="unlink">Unlink Connection</span>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { ModalEvent } from "@store/modal";
import { useMutationStore } from "@store/mutation";
import { User } from "@structures/User";
import { computed, ref } from "vue";
import ModalBase from "@components/modal/ModalBase.vue";
import { useActorStore } from "@/store/actor";

const props = defineProps<{
	user: User;
	connectionID: string;
}>();
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const actor = useActorStore();

const user = ref(props.user);
const connection = computed(() => user.value.connections?.filter((uc) => uc.id === props.connectionID)[0] ?? null);

// Owned Sets
const ownedSets = computed(() =>
	user.value.emote_sets?.filter((es) => es.owner && user.value && es.owner.id === user.value.id),
);

// Mutation
const m = useMutationStore();
const changeAssignedSet = (setID: string) => {
	m.editUserConnection(user.value.id, connection.value.id, {
		emote_set_id: setID,
	})
		.catch(actor.showErrorModal)
		.then(() => (connection.value.emote_set_id = setID));
};

// unlink
const unlink = () => {
	m.editUserConnection(user.value.id, connection.value.id, {
		unlink: true,
	})
		.catch(actor.showErrorModal)
		.finally(() => emit("close"));
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.connection-editor {
	margin: 1em;

	> div[selector="set-selector"] {
		> [selector="owned-sets"] {
			display: flex;
			flex-direction: column;
			padding: 0.5em;

			> div {
				padding: 0.75em;
				margin-top: 0.25em;
				margin-bottom: 0.25em;
				border-radius: 0.3em;

				&:hover {
					cursor: pointer;
				}
				@include themify() {
					background-color: darken(themed("backgroundColor"), 2);
					&:hover {
						background-color: darken(themed("backgroundColor"), 4);
					}
					&[selected="true"] {
						background-color: darken(themed("accent"), 4);
					}
				}
			}
		}
	}
}

.connection-buttons {
	display: flex;
	height: 3em;
	align-items: center;
	justify-content: space-between;
	margin-left: 1em;
	margin-right: 1em;

	> span[selector="btn-unlink"] {
		cursor: pointer;
		color: rgb(220, 50, 50);
	}
}
</style>
