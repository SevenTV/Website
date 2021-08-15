<template>
  <main class="home">
    <div class="info">
      <Logo class="logo" />
      <div class="slogan">
        <h1>It's like a third party thing</h1>
        <p>
          A new emote service and extension for Twitch.
          <router-link to="/about" class="learn-more">Learn more.</router-link>
        </p>
      </div>
    </div>
    <div class="downloads">
      <div class="title">
        <i class="material-icons unselectable download-icon" @mousedown.stop
          >download</i
        >
        <span>Downloads</span>
      </div>
      <div class="options">
        <a
          class="option"
          href="https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh"
        >
          <div class="tag"><span class="rainbow">1.6.1</span></div>
          <font-awesome-icon :icon="['fab', 'chrome']" />
        </a>
        <a
          class="option"
          href="https://addons.mozilla.org/en-US/firefox/addon/7tv/"
        >
          <div class="tag"><span class="rainbow">1.6.1</span></div>
          <FirefoxLogo />
        </a>
        <div class="option" href="">
          <div class="tag"><span class="chatterino">7.3.4</span></div>
          <ChatterinoLogo />
        </div>
        <div class="option">
          <span class="tag"><span class="mobile">Mobile</span></span>
          <font-awesome-icon :icon="['fas', 'mobile-alt']" />
        </div>
        <div class="option">
          <span class="tag"><span>More</span></span>
          <i class="material-icons unselectable code-icon" @mousedown.stop
            >code</i
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";

import Logo from "@/components/base/Logo.vue";
import ChatterinoLogo from "@/components/base/ChatterinoLogo.vue";
import FirefoxLogo from "@/components/base/FirefoxLogo.vue";

export default defineComponent({
  components: {
    Logo,
    ChatterinoLogo,
    FirefoxLogo,
  },
  setup() {
    useHead({
      title: "7TV | Home",
    });
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
