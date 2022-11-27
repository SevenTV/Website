<template>
	<div class="user-channel-emotes">
		<div class="user-channel-emotes-heading">
			<div class="user-connection-list">
				<span
					v-for="conn of connections"
					:key="conn.id"
					:platform="conn.platform"
					:selected="currentConn && currentConn.id === conn.id"
					class="user-connection use-brand-color"
					@click="selectConn(conn)"
				>
					<Icon size="lg" lib="fab" :icon="conn.platform.toLowerCase()" />
					<span>{{ conn.display_name }}</span>

					<span v-tooltip="t('user.edit_connection')" class="conn-edit" @click="edit(conn.id)">
						<Icon icon="gear" />
					</span>
				</span>
			</div>

			<span class="search-bar">
				<TextInput v-model="channelEmoteSearch" icon="search" :label="t('common.search')" />
			</span>
		</div>

		<!-- -->
		<div class="user-channel-emotes-list">
			<EmoteCardList v-if="pagedChannelEmotes.length" :items="pagedChannelEmotes" />
			<span v-else-if="currentConn">
				{{
					t("user.no_channel_emotes", [
						user.display_name,
						currentConn.platform.charAt(0) + currentConn.platform.slice(1).toLowerCase(),
					])
				}}.
			</span>
		</div>
		<div v-if="channelPager.length / pageSize > 1">
			<Paginator
				:page="channelPager.page"
				:items-per-page="pageSize"
				:length="channelPager.length"
				@change="(change) => (channelPager.page = change.page)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { User } from "@/structures/User";
import { computed, defineAsyncComponent, reactive, ref, toRef, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useModal } from "@/store/modal";
import { useActor } from "@/store/actor";
import TextInput from "@/components/form/TextInput.vue";
import EmoteCardList from "@/components/utility/EmoteCardList.vue";
import Icon from "@/components/utility/Icon.vue";
import Paginator from "../EmoteList/Paginator.vue";

const ModalConnectionEditor = defineAsyncComponent(() => import("@/components/modal/ModalConnectionEditor.vue"));

const props = withDefaults(
	defineProps<{
		user: User;
		pageSize?: number;
	}>(),
	{
		pageSize: 50,
	},
);

const actor = useActor();
const { t } = useI18n();

// Current user
const { user, pageSize } = toRefs(props);
const connections = toRef(user.value, "connections");
const sets = toRef(user.value, "emote_sets");

// Selection
const currentConn = ref<User.Connection | null>(connections.value[0] ?? null);
const currentSet = computed(() =>
	currentConn.value && currentConn.value.emote_set_id && Array.isArray(sets.value)
		? sets.value.find((set) => (currentConn.value as User.Connection).emote_set_id === set.id)
		: null,
);

const selectConn = (conn: User.Connection) => {
	currentConn.value = conn;
};

// Connection editor modal
const modal = useModal();
const edit = (connID: string) => {
	if (!actor.hasEditorPermission(user.value, User.EditorPermission.ManageProfile)) {
		return;
	}

	modal.open("connection-editor", {
		component: ModalConnectionEditor,
		props: { user: user, connectionID: connID },
		events: {},
	});
};

// Search
const channelEmotesSearched = (s: string) =>
	!channelEmoteSearch.value || s.toLowerCase().includes(channelEmoteSearch.value.toLowerCase());

const channelEmoteSearch = ref("");
watch(channelEmoteSearch, () => {
	channelPager.page = 1;
});
const channelPager = reactive({
	page: 1,
	length: computed(() => channelEmotes.value.filter((e) => channelEmotesSearched(e.name)).length),
});

const pagedChannelEmotes = computed(() => {
	const start = (channelPager.page - 1) * props.pageSize;
	const end = start + props.pageSize;
	return channelEmotes.value.filter((e) => channelEmotesSearched(e.name)).slice(start, end);
});

const channelEmotes = computed(() => currentSet.value?.emotes ?? []);
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

div.user-channel-emotes {
	display: block;
	margin-bottom: 1em;

	@include themify() {
		.user-channel-emotes-heading {
			background-color: darken(themed("backgroundColor"), 2);
		}

		.user-connection {
			background-color: lighten(themed("backgroundColor"), 1);

			&:hover {
				background-color: lighten(themed("backgroundColor"), 2.5);
			}

			&[selected="true"] {
				background-color: lighten(themed("backgroundColor"), 5);
				border-bottom: 0.15em solid;
			}

			> span.conn-edit {
				color: themed("color");
				transition: transform 150ms ease-in-out;

				&:hover {
					filter: drop-shadow(0 0 0.1em currentColor);
					> :first-child {
						animation: spin 5s linear infinite;
					}
				}

				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			}
		}
	}

	.user-channel-emotes-heading {
		display: flex;
		justify-content: space-between;

		.user-connection-list {
			height: 3em;
			padding: 0.33em;
			display: flex;
			align-items: center;
		}

		.search-bar {
			display: grid;
			align-items: center;
		}

		.user-connection {
			cursor: pointer;
			display: grid;
			grid-template-columns: 2em 1fr 0.25fr;
			align-items: center;
			padding: 0.33em;
			height: 100%;
			max-width: 16em;
			padding-right: 0.75em;
			padding-left: 1.5em;

			> span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			> span.conn-edit {
				text-align: center;
				vertical-align: middle;
			}

			width: 12em;
			transition: width 140ms ease-in-out;

			&[selected="false"] {
				width: 4.25em;
			}

			&[selected="true"] {
				font-weight: 700;
			}
		}

		$clipAngle: 1em;

		.user-connection:first-child {
			clip-path: polygon(0 0, calc(100% - $clipAngle) 0, 100% 100%, 0% 100%);
		}

		.user-connection:not(:first-child, :last-child) {
			clip-path: polygon(0 0, calc(100% - $clipAngle) 0, 100% 100%, $clipAngle 100%);
			transform: translateX(-0.75em);
		}

		.user-connection:last-child:not(:first-child) {
			clip-path: polygon(0 0, calc(100% - $clipAngle) 0, 100% 100%, $clipAngle 100%);
			transform: translateX(-1.5em);
		}
	}

	.user-channel-emotes-list {
		padding: 0.5em;
	}
}
</style>
