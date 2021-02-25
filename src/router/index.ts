/**
 * @Description: 路由文件
 * @Author: 菩萨蛮
 * @Date: 2021/2/18 10:07 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const routes = [
  {
    path: '/',
    name: 'Demo',
    component: defineAsyncComponent(() => import('../page/Demo.vue')),
    children: [
      {
        path: '/button',
        name: 'Button',
        component: defineAsyncComponent(() => import('../page/demos/ButtonDemo.vue'))
      },
      {
        path: '/input',
        name: 'Input',
        component: defineAsyncComponent(() => import('../page/demos/InputDemo.vue'))
      },
      {
        path: '/select',
        name: 'Select',
        component: defineAsyncComponent(() => import('../page/demos/SelectDemo.vue'))
      },
      {
        path: '/date-picker',
        name: 'DatePicker',
        component: defineAsyncComponent(() => import('../page/demos/DatePickerDemo.vue'))
      },
      {
        path: '/dialog',
        name: 'Dialog',
        component: defineAsyncComponent(() => import('../page/demos/DialogDemo.vue'))
      },
      {
        path: '/scroll-number',
        name: 'ScrollNumber',
        component: defineAsyncComponent(() => import('../page/demos/ScrollNumberDemo.vue'))
      },
      {
        path: '/tooltip',
        name: 'Tooltip',
        component: defineAsyncComponent(() => import('../page/demos/TooltipDemo.vue'))
      },
      {
        path: '/popover',
        name: 'Popover',
        component: defineAsyncComponent(() => import('../page/demos/PopoverDemo.vue'))
      },
      {
        path: '/message',
        name: 'Message',
        component: defineAsyncComponent(() => import('../page/demos/MessageDemo.vue'))
      },
      {
        path: '/form',
        name: 'Form',
        component: defineAsyncComponent(() => import('../page/demos/FormDemo.vue'))
      },
      {
        path: '/pagination',
        name: 'Pagination',
        component: defineAsyncComponent(() => import('../page/demos/PaginationDemo.vue'))
      },
      {
        path: '/upload',
        name: 'Upload',
        component: defineAsyncComponent(() => import('../page/demos/UploadDemo.vue'))
      },
      {
        path: '/print',
        name: 'Print',
        component: defineAsyncComponent(() => import('../page/demos/PrinterDemo.vue'))
      },
      {
        path: '/divider',
        name: 'Divider',
        component: defineAsyncComponent(() => import('../page/demos/DividerDemo.vue'))
      },
      {
        path: '/process',
        name: 'Process',
        component: defineAsyncComponent(() => import('../page/demos/ProcessDemo.vue'))
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
