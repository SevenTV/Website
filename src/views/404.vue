<template>
  <main class="not-found">
    <div>
      <img src="@/assets/pepeAgony.webp" />
      <span>
        <h2>well this is annoying</h2>
        <h2>we have no idea what you are looking for...</h2>
      </span>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
  setup() {
    useHead({
      title: "7TV | Not Found",
    });
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/404.scss";
</style>
