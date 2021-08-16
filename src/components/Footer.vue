<template>
  <footer>
    <div class="socials">
      <div class="discord">
        <a href="https://discord.com/invite/k7b27z77" target="popup">
          <DiscordLogo />
          <p>Join 7TV on Discord</p>
          <i>891 members online now</i>
        </a>
      </div>
      <div class="twitter">
        <a href="https://twitter.com/Official_7TV" target="_BLANK">
          <font-awesome-icon :icon="['fab', 'twitter']" />
          <p>Follow us on Twitter!</p>
        </a>
      </div>
      <div class="github">
        <a href="https://github.com/SevenTV" target="_BLANK">
          <font-awesome-icon :icon="['fab', 'github']" />
          <p>Contribute</p>
        </a>
      </div>
    </div>
    <div class="breadcrumbs">
      <router-link to="/contact" class="crumb">Contact</router-link>
      <font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
      <a href="https://github.com/SevenTV" class="crumb">GitHub</a>
      <font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
      <router-link to="/privacy" class="crumb blue">Privacy Policy</router-link>
      <font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
      <router-link to="/tos" class="crumb blue">Terms of Service</router-link>
      <font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
      <router-link to="/dmca" class="crumb blue">DMCA</router-link>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

import DiscordLogo from '@/components/base/DiscordLogo.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { DiscordLogo },
  setup() {
    const route = useRoute();
    watch(route, () => {
      window.scroll({ top: 0, behavior: 'smooth' });
    });
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/footer.scss';
</style>
