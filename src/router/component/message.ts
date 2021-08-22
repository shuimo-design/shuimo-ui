/**
 * @Description: 消息交互组件路由
 * @Author: 菩萨蛮
 * @Date: 2021/8/22 7:23 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


export const message = [
  {
    path: '/dialog',
    name: 'Dialog',
    component: () => import('../../page/demos/message/DialogDemo.vue')
  },
  {
    path: '/tooltip',
    name: 'Tooltip',
    component: () => import('../../page/demos/message/TooltipDemo.vue')
  },
  {
    path: '/popover',
    name: 'Popover',
    component: () => import('../../page/demos/message/PopoverDemo.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../../page/demos/message/MessageDemo.vue')
  },
]
