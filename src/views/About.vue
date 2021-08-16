<template>
  <main class="about">
    <h2>What is 7TV?</h2>
    <p>7TV is a new emote service and extension, providing custom emotes at no fee and supporting more formats to increase artistic freedom.</p>
    <h2>Key Features</h2>
    <ul>
      <li>All core functionality is free to use</li>
      <li>Up to 200 channel emote slots by default, free forever</li>
      <li>Support for wide and animated wide emotes (3:1 ratio)</li>
      <li>Monthly Community Events & Contests</li>
      <li>Downloadable for Chrome and Chromium-based browsers, Firefox, Chatterino & more</li>
      <li>Seamlessly integrates with your other Twitch extensions</li>
      <li>Uses the newer WebP image format, resulting in much lighter images</li>
      <li>Less opinionated: no content is removed so long as it is safe to show on stream and doesn't violate copyright</li>
      <li>Transparency: all moderator actions are recorded and visible publicly. No cheating involved.</li>
      <li>Active Development & Open Source</li>
    </ul>
    <h2>Frequently Asked Questions</h2>
    <ol>
      <li>
        <h3>Someone re-uploaded an emote I made, can I acquire ownership of it?</h3>
        <p>Yes, currently due to the lack of a built-in reporting system, the fastest way is by contacting a moderator on our discord server</p>
      </li>
    </ol>
    <h2>Have a question?</h2>
    <p>Feel free to contact us <router-link to="/contact">here</router-link>.</p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@vueuse/head';

export default defineComponent({
  setup() {
    useHead({
      title: '7TV | About',
    });
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/about.scss';
</style>
