/**
 * @Description: 模版组件路由
 * @Author: 菩萨蛮
 * @Date: 2021/8/22 7:25 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export const template = [

  {
    path: '/form',
    name: 'Form',
    component: () => import('../../page/demos/template/FormDemo.vue')
  },
  {
    path: '/pagination',
    name: 'Pagination',
    component: () => import('../../page/demos/template/PaginationDemo.vue')
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: () => import('../../page/demos/template/TabsDemo.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../../page/demos/template/TableDemo.vue')
  }
]
