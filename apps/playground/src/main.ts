/**
 * @description playground main index
 * @author 阿怪
 * @date 2023/3/30 17:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import app from './App.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./Home.vue') },
    { path: '/view', component: () => import('./View.vue') }
  ]
});

createApp(app)
  .use(router)
  .mount('#app');
