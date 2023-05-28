<template>
	<div class="user-channel-emotes">
		<div class="user-channel-emotes-heading">
			<div class="user-connection-list">
				<span
					v-for="conn of ctx.user.connections"
					:key="conn.id"
					:platform="conn.platform"
					:selected="ctx.currentConn && ctx.currentConn.id === conn.id"
					class="user-connection use-brand-color"
					@click="selectConn(conn)"
				>
					<LogoKick v-if="conn.platform === 'KICK'" />
					<Icon size="lg" lib="fab" :icon="conn.platform.toLowerCase()" />
					<span>{{ conn.display_name }}</span>

					<span
						v-if="mayEditProfile"
						v-tooltip="t('user.edit_connection')"
						class="conn-edit"
						@click.stop="edit(conn.id)"
					>
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
			<span v-else-if="loading">{{ t("common.loading") }}...</span>
			<span v-else-if="ctx.currentConn">
				{{
					t("user.no_channel_emotes", [
						ctx.user.display_name,
						ctx.currentConn.platform.charAt(0) + ctx.currentConn.platform.slice(1).toLowerCase(),
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
import { computed, defineAsyncComponent, reactive, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import { GetEmoteSet } from "@/apollo/query/emote-set.query";
import { ActiveEmote } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { useContext } from "@/composables/useContext";
import LogoKick from "@/components/base/LogoKick.vue";
import TextInput from "@/components/form/TextInput.vue";
import EmoteCardList from "@/components/utility/EmoteCardList.vue";
import Icon from "@/components/utility/Icon.vue";
import Paginator from "../emote-list/Paginator.vue";

const ModalConnectionEditor = defineAsyncComponent(() => import("@/components/modal/ModalConnectionEditor.vue"));

const props = withDefaults(
	defineProps<{
		pageSize?: number;
	}>(),
	{
		pageSize: 50,
	},
);

const actor = useActor();
const { t } = useI18n();

// Current user
const { pageSize } = toRefs(props);
const ctx = useContext("USER");
if (!ctx) throw new Error("No user context provided");

const mayEditProfile = computed(() => actor.hasEditorPermission(ctx.user, User.EditorPermission.ManageProfile));

// Selection
const emotes = ref<ActiveEmote[]>([]);
const currentSet = computed(() =>
	ctx.currentConn && ctx.currentConn.emote_set_id && Array.isArray(ctx.emoteSets)
		? ctx.emoteSets.find((set) => (ctx.currentConn as User.Connection).emote_set_id === set.id)
		: null,
);

const selectConn = (conn: User.Connection) => {
	if (ctx.currentConn && ctx.currentConn.id === conn.id) return;

	ctx.currentConn = conn;
	emotes.value.length = 0;
};

const { onResult, loading } = useQuery<GetEmoteSet>(
	GetEmoteSet,
	() => ({ id: currentSet.value?.id }),
	() => ({
		enabled: !!currentSet.value?.id,
	}),
);
onResult((result) => {
	if (!result.data?.emoteSet.emotes) return;

	emotes.value = structuredClone(result.data.emoteSet.emotes);
});

// Connection editor modal
const modal = useModal();
const edit = (connID: string) => {
	if (!mayEditProfile.value) {
		return;
	}

	modal.open("connection-editor", {
		component: ModalConnectionEditor,
		props: { user: ctx.user, connectionID: connID },
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

const channelEmotes = computed(() => emotes.value ?? []);
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

div.user-channel-emotes {
	display: block;
	margin-bottom: 1em;

	$collapsed: 4.5em;
	$expanded: 16em;

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
			justify-content: space-between;
			padding: 0.33em;
			height: 100%;
			padding-right: 1.5em;
			padding-left: 1.5em;
			margin-right: -0.75em;

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
		}

		.user-connection:last-child:not(:first-child) {
			clip-path: polygon(0 0, calc(100% - $clipAngle) 0, 100% 100%, $clipAngle 100%);
		}
	}

	.user-channel-emotes-list {
		padding: 0.5em;
	}
}
</style>
