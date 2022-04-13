/**
 * @description 其他组件路由
 * @author 阿怪
 * @date 2021/8/22 7:28 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export const other = [
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
    path: '/progress',
    name: 'Progress',
    component: () => import('../../page/demos/other/ProgressDemo.vue')
  },
  {
    path: '/border',
    name: 'Border',
    component: () => import('../../page/demos/other/BorderDemo.vue')
  },
]
