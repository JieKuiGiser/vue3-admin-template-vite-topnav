<script setup>
import { defineProps } from "vue";
defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <svg-icon v-if="icon" :icon-class="icon" />
  <span v-if="title">{{ title }}</span>
</template>
