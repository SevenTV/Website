<template>
	<div>
		<!-- <TextInput label="YEAHBUT" v-model="xd" :value="xd" /> -->

		<Checkbox v-model:checked="xd" scale="1.5em" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@components/form/Checkbox.vue";

const xd = ref(false);

// watch(xd, (v) => console.log(v));
</script>
