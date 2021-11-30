<template>
	<div class="inbox">
		<!-- Heading -->
		<span selector="heading">
			<!-- Mobile sidebar -->
			<div selector="sidebar-toggle" @click="sidebarCollapse = !sidebarCollapse">
				<font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
			</div>

			<font-awesome-icon :icon="['fas', 'inbox']" />
			<h3>{{ $t("inbox.inbox") }}</h3>
		</span>

		<!-- Sidebar -->
		<div class="sidebar" :collapse="sidebarCollapse">
			<!-- "Send Message" button -->
			<div class="send-btn">
				<Button color="primary" label="SEND MESSAGE" />
			</div>

			<!-- Tabs -->
			<div class="sidebar-item-list">
				<div v-for="i of sidebarItems" :key="i.route" selector="sidebar-item" @click="() => setTab(i)">
					<span>{{ $t(i.label) }}</span>
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

			<div class="message-list">
				<div v-for="msg of messages" :key="msg.id" selector="message" :unread="!msg.read">
					<div class="msg-title">
						<span selector="title">
							{{ msg.parsedData.subject }}
							<div v-if="!msg.read" selector="unread-tag">{{ $t("inbox.unread_tag").toUpperCase() }}</div>
						</span>
						<span selector="content-preview">
							{{ msg.parsedData.content.slice(0, 70) }}
							{{ msg.parsedData.content.length > 70 ? "..." : "" }}
						</span>
					</div>
					<div class="msg-author">
						<span selector="sender-text">Sent by</span>
						<UserTag :user="msg.author" scale="2em" :clickable="true" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { GetInboxMessages } from "@/assets/gql/messages/inbox";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent, computed, ref } from "vue";
import { Message } from "@/structures/Message";
import Button from "@/components/utility/Button.vue";
import TextInput from "@/components/form/TextInput.vue";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: { Button, TextInput, UserTag },
	props: {
		disableRouter: Boolean,
		defaultTab: String,
	},
	setup() {
		const { result } = useQuery<GetInboxMessages>(GetInboxMessages);
		const messages = computed(() =>
			(result.value?.inbox ?? []).map((msg) => {
				msg.parsedData = JSON.parse(msg.data) as Message.Inbox;
				return msg;
			})
		);
		const sidebarCollapse = ref(true);

		const sidebarItems = [
			{ label: "inbox.tabs.all", route: "/" },
			{ label: "inbox.tabs.unread", route: "/unread" },
			{ label: "inbox.tabs.important", route: "/important" },
		] as SidebarItem[];

		const setTab = (i: SidebarItem): void => {
			sidebarCollapse.value = true;
		};

		return {
			messages,
			sidebarCollapse,
			sidebarItems,
			setTab,
		};
	},
});

interface SidebarItem {
	label: string;
	route: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox.scss";
</style>
