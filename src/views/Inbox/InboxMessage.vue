<template>
	<div class="inbox-message-view">
		<h3 v-if="msg" selector="subject">
			<span class="back-icon" @click="$emit('exit')">
				<font-awesome-icon :icon="['fas', 'arrow-left']" />
			</span>
			{{ $t(msg.parsed.subject) }}
		</h3>
		<div selector="subject-divider"></div>

		<div selector="msg-body">
			<div selector="msg-sender">
				<span>Sender</span>
				<UserTag :user="msg?.author" scale="1.5em" :clickable="true" />
			</div>

			<div v-if="msg" selector="formatted-content">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="content" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { Message } from "@/structures/Message";
import { useMutation } from "@vue/apollo-composable";
import { marked } from "marked";
import { ReadMessages } from "@/assets/gql/mutation/ReadMessages";
import { ApplyMutation } from "@/structures/Update";
import { User } from "@/structures/User";
import DOMPurify from "dompurify";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: {
		UserTag,
	},
	props: {
		msg: Object as PropType<Message<Message.Inbox>>,
	},
	emits: ["exit"],
	setup(props) {
		const store = useStore();
		const clientUser = computed(() => store.getters.clientUser as User | null);
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
						if (clientUser.value && clientUser.value?.inbox_unread_count > 0) {
							clientUser.value.inbox_unread_count -= 1;
						}
						ApplyMutation(props.msg, {
							action: "set",
							field: "read",
							value: JSON.stringify(true),
						});
					}
				});
		}

		const { t } = useI18n();
		const placeholders = computed(() => props.msg?.parsed.placeholders ?? {});
		const content = computed(() =>
			DOMPurify.sanitize(
				marked.parse(
					t(
						props.msg?.parsed.content ?? "",
						Object.keys(placeholders.value)
							.map((s) => ({
								[s]: t(placeholders.value[s]),
							}))
							.reduce((a, b) => ({ ...a, ...b }))
					),
					{
						gfm: true,
						breaks: true,
					}
				)
			)
		);
		return {
			content,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox-message.scss";
</style>
