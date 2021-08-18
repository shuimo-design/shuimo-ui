/**
 * @Description: 路由文件
 * @Author: 菩萨蛮
 * @Date: 2021/2/18 10:07 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/entry',
    name: 'Entry',
    component: () => import('../page/Entry.vue'),
  },
  {
    path: '/',
    name: 'Demo',
    component: () => import('../page/Demo.vue'),
    children: [
      {
        path: '',
        name: 'base',
        component: () => import('../page/Main.vue')
      },
      {
        path: '/button',
        name: 'Button',
        component: () => import('../page/demos/ButtonDemo.vue')
      },
      {
        path: '/input',
        name: 'Input',
        component: () => import('../page/demos/InputDemo.vue')
      },
      {
        path: '/select',
        name: 'Select',
        component: () => import('../page/demos/SelectDemo.vue')
      },
      {
        path: '/date-picker',
        name: 'DatePicker',
        component: () => import('../page/demos/DatePickerDemo.vue')
      },
      {
        path: '/dialog',
        name: 'Dialog',
        component: () => import('../page/demos/DialogDemo.vue')
      },
      {
        path: '/scroll-number',
        name: 'ScrollNumber',
        component: () => import('../page/demos/ScrollNumberDemo.vue')
      },
      {
        path: '/tooltip',
        name: 'Tooltip',
        component: () => import('../page/demos/TooltipDemo.vue')
      },
      {
        path: '/popover',
        name: 'Popover',
        component: () => import('../page/demos/PopoverDemo.vue')
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('../page/demos/MessageDemo.vue')
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('../page/demos/FormDemo.vue')
      },
      {
        path: '/pagination',
        name: 'Pagination',
        component: () => import('../page/demos/PaginationDemo.vue')
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import('../page/demos/UploadDemo.vue')
      },
      {
        path: '/print',
        name: 'Print',
        component: () => import('../page/demos/PrinterDemo.vue')
      },
      {
        path: '/divider',
        name: 'Divider',
        component: () => import('../page/demos/DividerDemo.vue')
      },
      {
        path: '/process',
        name: 'Process',
        component: () => import('../page/demos/ProcessDemo.vue')
      },
      {
        path: '/radio',
        name: 'Radio',
        component: () => import('../page/demos/RadioDemo.vue')
      },
      {
        path: '/checkbox',
        name: 'Checkbox',
        component: () => import('../page/demos/CheckboxDemo.vue')
      },
      {
        path: '/tabs',
        name: 'Tabs',
        component: () => import('../page/demos/TabsDemo.vue')
      },
      {
        path: '/mdEditor',
        name: 'MdEditor',
        component: () => import('../page/demos/MdEditorDemo.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
