/**
 * @description 路由文件
 * @author 阿怪
 * @date 2021/2/18 10:07 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../page/Main.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
