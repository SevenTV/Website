<template>
	<div class="inbox-message-view">
		<h3 selector="subject">{{ msg?.parsed.subject }}</h3>
		<div selector="subject-divider"></div>

		<div selector="msg-body">
			<div selector="msg-sender">
				<span>Sender</span>
				<UserTag :user="msg?.author" scale="1.5em" :clickable="true" />
			</div>

			<span selector="formatted-content">
				<Markdown :source="msg?.parsed.content" />
			</span>
		</div>
		<span>{{ msg?.read }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Message } from "@/structures/Message";
import { useMutation } from "@vue/apollo-composable";
import { ReadMessages } from "@/assets/gql/mutation/ReadMessages";
import { ApplyMutation } from "@/structures/Update";
import Markdown from "vue3-markdown-it";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: {
		Markdown,
		UserTag,
	},
	props: {
		msg: Object as PropType<Message<Message.Inbox>>,
	},
	setup(props) {
		const mutation = {
			setRead: useMutation<ReadMessages>(ReadMessages),
		};

		if (props.msg && !props.msg.read) {
			mutation.setRead
				.mutate({
					ids: [props.msg.id],
					read: true,
				})
				.then((res) => {
					if (res?.data?.readMessages === 1) {
						ApplyMutation(props.msg, {
							action: "set",
							field: "read",
							value: JSON.stringify(true),
						});
					}
				});
		}
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox-message.scss";
</style>
