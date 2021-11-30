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

			<div v-if="!selectedMsg" class="message-list">
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
							{{ msg.parsed.subject }}
							<div v-if="!msg.read" selector="unread-tag">{{ $t("inbox.unread_tag").toUpperCase() }}</div>
						</span>
						<span selector="content-preview">
							{{ msg.parsed.content.slice(0, 70) }}
							{{ msg.parsed.content.length > 70 ? "..." : "" }}
						</span>
					</div>
					<div class="msg-author">
						<span selector="sender-text">Sent by</span>
						<UserTag :user="msg.author" scale="2em" :clickable="true" />
					</div>
				</div>
			</div>
			<InboxMessage v-else :msg="selectedMsg" @exit="selectedMsg = null" />
		</div>
	</div>
</template>

<script lang="ts">
import { GetInboxMessages } from "@/assets/gql/messages/inbox";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent, computed, ref } from "vue";
import { Message } from "@/structures/Message";
import { ConvertIntColorToHex, SetHexAlpha } from "@/structures/User";
import InboxMessage from "./InboxMessage.vue";
import Button from "@/components/utility/Button.vue";
import TextInput from "@/components/form/TextInput.vue";
import UserTag from "@/components/utility/UserTag.vue";
import { useRouter } from "vue-router";

export default defineComponent({
	components: { Button, TextInput, UserTag, InboxMessage },
	props: {
		noRouting: Boolean,
		defaultTab: String,
	},
	setup(props) {
		const router = useRouter();
		const { result } = useQuery<GetInboxMessages>(GetInboxMessages);
		const messages = computed(() =>
			(result.value?.inbox ?? []).map((msg) => {
				msg.parsed = JSON.parse(msg.data) as Message.Inbox;
				return msg;
			})
		);
		const sidebarCollapse = ref(true);
		const sidebarItems = [
			{ label: "inbox.tabs.all", route: "/" },
			{ label: "inbox.tabs.unread", route: "/unread" },
			{ label: "inbox.tabs.important", route: "/important" },
		] as SidebarItem[];

		const selectedMsg = ref<Message<Message.Inbox> | null>(null);
		const setTab = (i: SidebarItem): void => {
			sidebarCollapse.value = true;
			if (!props.noRouting) {
				router.push("/inbox" + i.route);
			}
		};

		return {
			messages,
			sidebarCollapse,
			sidebarItems,
			selectedMsg,
			setTab,
			ConvertIntColorToHex,
			SetHexAlpha,
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
