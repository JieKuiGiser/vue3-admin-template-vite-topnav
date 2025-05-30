import router from "@/router";
import { ElMessage, ElNotification } from "element-plus";
const whiteList = [
  "/login",
];

router.beforeEach(async (to, _from, next) => {
  next()
});

router.afterEach(() => { });
