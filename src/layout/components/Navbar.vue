<template>
  <div class="navbar">
    <hamburger
      v-if="!appStore.sidebar.hide"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger//index.vue";
import { useAppStore } from "@/store/app";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      appStore: useAppStore(),
    };
  },
  computed: {
  },
  methods: {
    toggleSideBar() {
      this.appStore.toggleSideBar();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>
