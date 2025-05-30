const ip = require("ip");

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import requireTransform from "vite-plugin-require-transform";
import { svgBuilder } from "./src/plugin/icons/svgBuilder";
import ElementPlus from "unplugin-element-plus/vite";
import { resolve } from "path";
const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const alias = {
  "@": pathResolve("src"),
};
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.json', '.vue'],
    alias
  },
  plugins: [
    vue(),
    // requireTransform({
    //   fileRegex: /.js$|.jsx$|.vue$/
    // }),
    // ElementPlus({}),
    svgBuilder("./src/plugin/icons/svg/"),
  ],
  // server: {
  //   port: 9000,
  //   cors: true,
  //   host: ip.address(),
  // },
  server: {
    hmr: true,
    host: '0.0.0.0',
    cors: true,
  },
  css: {
    preprocessorMaxWorkers: true,
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api']
      },
    },
  },
});
