<template>
	<div class="inbox-compose">
		<div selector="heading">
			<h3>
				<span class="back-icon" @click="emit('exit')">
					<font-awesome-icon :icon="['far', 'arrow-left']" />
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

<script setup lang="ts">
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { SendInboxMessage } from "@gql/mutation/SendInboxMessage";
import TextInput from "@components/form/TextInput.vue";
import Button from "@components/utility/Button.vue";

const emit = defineEmits(["exit"]);
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
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox-compose.scss";
</style>
