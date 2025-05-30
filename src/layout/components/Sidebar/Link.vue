<template>
  <!-- eslint-disable vue/require-component-is -->
  <component :is="componentName" v-bind="componentAttrs">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate.js";

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    componentName() {
      return isExternal(this.to) ? "a" : "router-link";
    },
    componentAttrs() {
      if (isExternal(this.to)) {
        return {
          href: this.to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to: this.to,
      };
    },
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        is: "router-link",
        to: url,
      };
    },
  },
};
</script>
