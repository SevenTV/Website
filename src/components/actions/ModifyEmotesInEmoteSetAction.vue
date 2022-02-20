<template>
	<span @click="run">
		<slot />
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ChangeEmoteInSet } from "@/assets/gql/mutation/Emote";
import { useMutation } from "@vue/apollo-composable";
import { Common } from "@/structures/Common";

export default defineComponent({
	props: {
		action: {
			type: String as PropType<Common.ListItemAction>,
			required: true,
		},
		setID: {
			type: String,
			required: true,
		},
		emoteID: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const mutation = useMutation<ChangeEmoteInSet.Result, ChangeEmoteInSet.Variables>(ChangeEmoteInSet);

		const run = () => {
			mutation.mutate({
				action: props.action,
				id: props.setID,
				emote_id: props.emoteID as string,
				name: props.name,
			});
		};
		return { run };
	},
});
</script>
