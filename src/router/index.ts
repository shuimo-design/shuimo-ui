/**
 * @Description: 路由文件
 * @Author: 菩萨蛮
 * @Date: 2021/2/18 10:07 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { createRouter, createWebHistory } from 'vue-router';
import { base } from "./component/base";
import { template } from "./component/template";
import { message } from "./component/message";
import { other } from "./component/other";

const routes = [
  {
    path: '/',
    name: 'Entry',
    component: () => import('../page/Entry.vue'),
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../page/Demo.vue'),
    children: [
      {
        path: '',
        name: 'base',
        component: () => import('../page/Main.vue')
      },
      ...base,
      ...template,
      ...message,
      ...other,
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
