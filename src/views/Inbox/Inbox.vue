<template>
	<div class="inbox">
		<!-- Heading -->
		<span selector="heading">
			<!-- Mobile sidebar -->
			<div selector="sidebar-toggle" @click="sidebarCollapse = !sidebarCollapse">
				<font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
			</div>

			<font-awesome-icon :icon="['fas', 'inbox']" />
			<h3>{{ t("inbox.inbox") }}</h3>
		</span>

		<!-- Sidebar -->
		<div class="sidebar" :collapse="sidebarCollapse">
			<!-- "Send Message" button -->
			<div class="send-btn" @click="composing = true">
				<Button v-if="mayCompose" color="primary" label="SEND MESSAGE" />
			</div>

			<!-- Tabs -->
			<div class="sidebar-item-list">
				<div v-for="i of sidebarItems" :key="i.route" selector="sidebar-item" @click="() => setTab(i)">
					<span>{{ t(i.label) }}</span>
				</div>
			</div>
		</div>
		<div class="content">
			<!-- Filters & Search -->
			<div class="heading">
				<div></div>
				<div class="search-bar">
					<TextInput label="Search" />
				</div>
			</div>

			<div v-if="!selectedMsg && !composing" class="message-list">
				<div v-if="messages.length === 0" class="no-messages">
					<span>No messages yet</span>
					<img src="@img/stare.webp" />
				</div>
				<div
					v-for="msg of messages"
					:key="msg.id"
					selector="message"
					:unread="!msg.read"
					:style="{ backgroundColor: ConvertIntColorToHex(msg.author?.tag_color ?? 0) + SetHexAlpha(0.15) }"
					@click="selectedMsg = msg"
				>
					<div class="msg-title">
						<span selector="title">
							{{ t(msg.subject) }}
							<div v-if="!msg.read" selector="unread-tag">{{ t("inbox.unread_tag").toUpperCase() }}</div>
						</span>
						<span selector="content-preview">
							{{ t(msg.content).slice(0, 70) }}
							{{ msg.content.length > 70 ? "..." : "" }}
						</span>
						<span selector="created-at">{{ msg.created_at_formatted }}</span>
					</div>
					<div class="msg-author">
						<span selector="sender-text">Sent by</span>
						<UserTag :user="msg.author" scale="2em" :clickable="true" />
					</div>
				</div>
			</div>
			<InboxCompose v-else-if="composing" @exit="composing = false" />
			<InboxMessage v-else-if="selectedMsg" :msg="selectedMsg" @exit="selectedMsg = null" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { GetInboxMessages } from "@gql/messages/inbox";
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Message } from "@structures/Message";
import { User } from "@structures/User";
import { ConvertIntColorToHex, SetHexAlpha } from "@structures/util/Color";
import { Permissions } from "@structures/Role";
import { useRouter } from "vue-router";
import { useActorStore } from "@store/actor";
import formatDate from "date-fns/fp/format";
import InboxMessage from "@views/Inbox/InboxMessage.vue";
import InboxCompose from "@views/Inbox/InboxCompose.vue";
import Button from "@components/utility/Button.vue";
import TextInput from "@components/form/TextInput.vue";
import UserTag from "@components/utility/UserTag.vue";

const { t } = useI18n();

const props = defineProps({
	noRouting: Boolean,
	defaultTab: String,
});
const router = useRouter();
const actorStore = useActorStore();
const clientUser = computed(() => actorStore.user);

// Query for messages
const { result } = useQuery<GetInboxMessages>(GetInboxMessages, { user_id: clientUser.value?.id });
const messages = computed(() =>
	(result.value?.inbox ?? []).map((msg) => {
		msg.created_at_formatted = formatDate("MMMM. d, p")(new Date(msg.created_at));
		return msg;
	}),
);

// Sidebar state
const sidebarCollapse = ref(true);
const sidebarItems = [
	{ label: "inbox.tabs.all", route: "/" },
	{ label: "inbox.tabs.unread", route: "/unread" },
	{ label: "inbox.tabs.important", route: "/important" },
] as SidebarItem[];

const composing = ref(false);
const selectedMsg = ref<Message.Inbox | null>(null);
const setTab = (i: SidebarItem): void => {
	sidebarCollapse.value = true;
	if (!props.noRouting) {
		router.push("/inbox" + i.route);
	}
};

const mayCompose = computed(() => User.HasPermission(clientUser.value, Permissions.SendMessages));

interface SidebarItem {
	label: string;
	route: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox.scss";
</style>
