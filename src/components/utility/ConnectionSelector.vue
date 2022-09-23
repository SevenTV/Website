<template>
	<div v-if="user" class="user-connection-selector user-connection-selector">
		<div
			v-for="conn of user.connections"
			:key="conn.id"
			v-wave
			:platform="conn.platform"
			:selected="connections.has(conn.id)"
			class="user-connection-item user-connection-platform"
			@click="toggleChecked(conn.id)"
		>
			<div selector="conn-id">
				<p selector="platform-name">{{ conn.platform.charAt(0) + conn.platform.slice(1).toLowerCase() }}</p>
				<span selector="conn-user-name"> {{ conn.display_name }} </span>
			</div>
			<div selector="conn-check">
				<Checkbox :checked="connections.has(conn.id)" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@components/form/Checkbox.vue";
import { User } from "@/structures/User";

const props = defineProps<{
	user: User;
	startingValue: string[];
}>();
const emit = defineEmits<{
	(e: "update", list: string[]): void;
}>();
emit("update", []);

const connections = ref(new Set<string>());

const toggleChecked = (id: string) => {
	connections.value.has(id) ? connections.value.delete(id) : connections.value.add(id);
	emit("update", Array.from(connections.value.values()));
};

if (Array.isArray(props.startingValue)) {
	props.startingValue.forEach((v) => toggleChecked(v));
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
@import "@scss/common/connection-platforms.scss";

div.user-connection-selector {
	display: flex;
	flex-direction: column;
	max-height: 12em;
	overflow: auto;
	border-radius: 0.3em;

	> div.user-connection-item {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 16em;

		&[platform="DISCORD"] {
			display: none;
		}

		> [selector="conn-id"] {
			padding: 0.5em;

			> [selector="platform-name"] {
				font-weight: 500;
			}
			> span[selector="conn-user-name"] {
				width: 12em;
				text-overflow: ellipsis;
				display: inline-block;
				overflow: hidden;
			}
		}
		> [selector="conn-check"] {
			pointer-events: none;
		}
	}
}
</style>
