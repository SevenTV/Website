<template>
	<ModalBase v-if="connection" width="32em" @close="emit('close')">
		<template #heading>
			<h3>{{ User.getStyledPlatformName(connection.platform) }} Connection - {{ connection.display_name }}</h3>
		</template>

		<template #content>
			<div class="connection-editor">
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
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { ModalEvent } from "@/store/modal";
import { useMutationStore } from "@/store/mutation";
import { User } from "@/structures/User";
import { computed, defineEmits, defineProps, ref } from "vue";
import ModalBase from "./ModalBase.vue";

const props = defineProps<{
	user: User;
	connectionID: string;
}>();
const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const user = ref(props.user);
const connection = computed(() => user.value.connections?.filter((uc) => uc.id === props.connectionID)[0] ?? null);

// Owned Sets
const ownedSets = computed(() =>
	user.value.emote_sets?.filter((es) => es.owner && user.value && es.owner.id === user.value.id)
);

// Mutation
const m = useMutationStore();
const changeAssignedSet = (setID: string) => {
	m.editUserConnection(user.value.id, connection.value.id, {
		emote_set_id: setID,
	});
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.connection-editor {
	margin: 1em;

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
</style>
