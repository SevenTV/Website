<template>
	<div>
		<!-- <TextInput label="YEAHBUT" v-model="xd" :value="xd" /> -->

		<Checkbox v-model:checked="xd" scale="1.5em" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Checkbox from "@/components/form/Checkbox.vue";

export default defineComponent({
	components: { Checkbox },
	setup() {
		const xd = ref(false);

		watch(xd, (v) => console.log(v));
		return {
			xd,
		};
	},
});
</script>
