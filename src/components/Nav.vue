<template>
  <nav :class="{ atTop }">
    <router-link class="logo" to="/">
      <Logo />
      <div class="text">
        <span class="name">7tv.app</span>
        <span class="mode">{{ mode }}</span>
      </div>
    </router-link>
    <div class="collapse">
      <div class="main-links">
        <router-link class="nav-link home" to="/"
          ><span>Home</span></router-link
        >
        <router-link class="nav-link about" to="/about"
          ><span>About</span></router-link
        >
        <router-link class="nav-link emotes" to="/emotes"
          ><span>Emotes</span></router-link
        >
        <router-link class="nav-link admin" to="/admin"
          ><span>Admin</span></router-link
        >
      </div>
      <div class="account" :style="`--user-color: ${userColor};`">
        <font-awesome-icon
          v-if="theme === 'dark'"
          class="unselectable"
          :icon="['fas', 'sun']"
          @click="() => changeTheme('light')"
          @mousedown.prevent
        />
        <font-awesome-icon
          v-else
          class="unselectable"
          :icon="['fas', 'moon']"
          @click="() => changeTheme('dark')"
          @mousedown.stop
        />

        <i class="material-icons unselectable" @mousedown.stop>swap_vert</i>

        <img
          class="pfp"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/9da7c7c3-4760-4290-806f-343c684807d7-profile_image-300x300.png"
        />
        <span class="name">TroyDota</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, reactive } from "vue";
import Logo from "@/components/base/Logo.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    Logo,
  },
  setup() {
    const store = useStore();

    const data = reactive({
      userColor: "#d73c2d",
      mode: "beta",
      theme: computed(() => store.getters.theme as "light" | "dark"),
      atTop: false,
      changeTheme(theme: "dark" | "light") {
        store.commit("SET_THEME", theme);
      },
    });

    let stop = false;
    onBeforeUnmount(() => {
      stop = true;
    });

    const i = () => {
      if (stop) return;
      window.requestAnimationFrame(() => {
        data.atTop = !!window.scrollY;
        i();
      });
    };
    i();

    return data;
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/nav.scss";
</style>
