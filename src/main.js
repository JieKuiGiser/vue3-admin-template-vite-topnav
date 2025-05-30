import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router"
import { createPinia } from 'pinia'
import scrollbarDirective from "@/directive/scroll/scrollbarDirective";

import "@/router/permission.js"; // 动态校验路由
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import '@/styles/index.scss' // global css
import locale from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import svgIcon from "./plugin/icons/svgIcon.vue"; // svg文件
const app = createApp(App);
const pinia = createPinia();
app.component("svg-icon", svgIcon);
// 全局注册icon（后期可优化，按需注册）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(ElementPlus, { locale });
app.use(scrollbarDirective);
app.use(router);
app.use(pinia)
app.mount("#app");
