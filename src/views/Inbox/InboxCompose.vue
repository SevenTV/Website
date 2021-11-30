<template>
	<div class="inbox-compose">
		<div selector="heading">
			<h3>
				<span class="back-icon" @click="$emit('exit')">
					<font-awesome-icon :icon="['fas', 'arrow-left']" />
				</span>
				Compose Message
			</h3>
			<div class="send-btn" @click="doSend">
				<Button color="accent" label="SEND" />
			</div>
		</div>
		<div selector="formfield">
			<TextInput v-model="form.subject" label="Subject" :style="{ width: '150%' }" />
		</div>
		<div selector="formfield">
			<TextInput v-model="form.recipient" label="Recipient ID" />
		</div>

		<textarea v-model="form.content" placeholder="# Hello there" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { SendInboxMessage } from "@/assets/gql/mutation/SendInboxMessage";
import TextInput from "@/components/form/TextInput.vue";
import Button from "@/components/utility/Button.vue";

export default defineComponent({
	components: { TextInput, Button },
	emits: ["exit"],
	setup() {
		const form = reactive({
			recipient: "",
			subject: "",
			content: "",
		});

		const send = useMutation(SendInboxMessage);
		const doSend = () =>
			send.mutate({
				recipients: [form.recipient],
				subject: form.subject,
				content: form.content,
			});

		return {
			form,
			doSend,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox-compose.scss";
</style>
