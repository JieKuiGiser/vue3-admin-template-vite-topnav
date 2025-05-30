<template>
  <div :class="classObj" class="app-wrapper">
    <topbar />
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div
      :class="{ sidebarHide: sidebar.hide }"
      class="main-container"
    >
      <div :class="{ 'fixed-header': settingsStore.fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Topbar } from "./components";
// import ResizeMixin from "./mixin/ResizeHandler";
import { useSettingsStore } from "@/store/settings";
import { useAppStore } from "@/store/app";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Topbar,
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      appStore: useAppStore(),
    };
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.appStore.sidebar;
    },
    device() {
      return this.appStore.device;
    },
    classObj() {
      return {
        hideSidebar: !this.appStore.sidebar.opened,
        openSidebar: this.appStore.sidebar.opened,
        withoutAnimation: this.appStore.sidebar.withoutAnimation,
        mobile: this.appStore.sidebar.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", {
        withoutAnimation: false,
      });
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
.app-wrapper {
  position: relative;
  // height: 100%;
  height: $contentHeight;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 56px;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
