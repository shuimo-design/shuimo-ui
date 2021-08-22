/**
 * @Description: 基础组件路由
 * @Author: 菩萨蛮
 * @Date: 2021/8/22 7:22 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


export const base = [
  {
    path: '/button',
    name: 'Button',
    component: () => import('../../page/demos/base/ButtonDemo.vue')
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import('../../page/demos/base/InputDemo.vue')
  },
  {
    path: '/select',
    name: 'Select',
    component: () => import('../../page/demos/base/SelectDemo.vue')
  },
  {
    path: '/date-picker',
    name: 'DatePicker',
    component: () => import('../../page/demos/base/DatePickerDemo.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import('../../page/demos/base/RadioDemo.vue')
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () => import('../../page/demos/base/CheckboxDemo.vue')
  },
]
