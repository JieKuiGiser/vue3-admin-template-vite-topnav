<template>
  <div :class="{ 'has-logo': settingsStore.sidebarLogo }" class="sidebar-container">
    <logo v-if="settingsStore.sidebarLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :collapse="isCollapse" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/variables.scss?inline";
import { useSettingsStore } from "@/store/settings";
import { useAppStore } from "@/store/app";
import { usePermissionStore } from "@/store/permission";

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      settingsStore: useSettingsStore(),
      appStore: useAppStore(),
      permissionStore: usePermissionStore(),
    };
  },
  computed: {
    routes() {
      // return this.$router.options.routes
      return this.permissionStore.currentRoutes.children;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.appStore.sidebar.opened;
    },
  },
};
</script>
