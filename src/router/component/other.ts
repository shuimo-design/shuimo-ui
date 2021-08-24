/**
 * @Description: 其他组件路由
 * @Author: 菩萨蛮
 * @Date: 2021/8/22 7:28 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export const other = [
  {
    path: '/scroll-number',
    name: 'ScrollNumber',
    component: () => import('../../page/demos/other/ScrollNumberDemo.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../../page/demos/other/UploadDemo.vue')
  },
  {
    path: '/print',
    name: 'Print',
    component: () => import('../../page/demos/other/PrinterDemo.vue')
  },
  {
    path: '/divider',
    name: 'Divider',
    component: () => import('../../page/demos/other/DividerDemo.vue')
  },
  {
    path: '/process',
    name: 'Process',
    component: () => import('../../page/demos/other/ProcessDemo.vue')
  },
  {
    path: '/border',
    name: 'Border',
    component: () => import('../../page/demos/other/BorderDemo.vue')
  },
]
