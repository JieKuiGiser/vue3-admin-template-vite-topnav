<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon
            v-if="
              onlyOneChild.meta.icon || (item.meta && item.meta.icon)
            "
            :icon-class="
              onlyOneChild.meta.icon || (item.meta && item.meta.icon)
            "
          />
          <template #title>
            <span class="title">
              {{ onlyOneChild.meta.title }}
            </span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      teleported
    >
      <template #title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :icon-class="item.meta && item.meta.icon"
        />
        <span class="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script>
import path from "path-browserify";
import { isExternal } from "@/utils/validate.js";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
import FixiOSBug from "./FixiOSBug.js";
import { usePermissionStore } from "@/store/permission";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      permissionStore: usePermissionStore(),
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: "",
          noShowingChildren: true,
        };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      const currentRoutes = this.permissionStore.currentRoutes;
      if (currentRoutes && currentRoutes.path) {
        return path.resolve(
          currentRoutes.path,
          this.basePath,
          routePath,
        );
      }
    },
  },
};
</script>
