/**
 * @Description:
 * @Author: 阿怪
 * @Date: 2022/3/6 1:20 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
// import type { MenuTypeArr } from "shuimo-ui";

type MenuTypeArr = any;
export const menu: MenuTypeArr = [
  {
    label: '首页', route: 'main', isActive: false, children: [
      { label: '快速开始', route: 'quickStart', isActive: false },
      { label: '颜色', route: 'color', isActive: false },
      { label: '从wash-painting升级', route: 'w2m', isActive: false },
    ]
  },

  {
    label: '基础组件', route: 'button', isActive: false, children: [
      { label: '按钮', route: 'button', isActive: false },
      { label: '输入框', route: 'input', isActive: false },
      { label: '单选框', route: 'radio', isActive: false },
      { label: '复选框', route: 'checkbox', isActive: false },
      { label: '选择框', route: 'select', isActive: false },
      { label: '日期选择框', route: 'datePicker', isActive: false },
      { label: '列表', route: 'list', isActive: false },
      { label: '开关', route: 'switch', isActive: false },
      { label: '标签', route: 'tag', isActive: false },
      { label: '滑动条', route: 'slider', isActive: false },
    ]
  },
  {
    label: '模版组件', route: 'form', isActive: false, children: [
      { label: '表单', route: 'form', isActive: false },
      { label: '列表', route: 'table', isActive: false },
      { label: '分页', route: 'pagination', isActive: false },
      { label: '宣纸布局', route: 'rice-paper', isActive: false },
    ]
  },
  {
    label: '消息组件', route: 'dialog', isActive: false, children: [
      { label: '弹窗', route: 'dialog', isActive: false },
      { label: '抽屉', route: 'drawer', isActive: false },
      { label: '提示', route: 'message', isActive: false },
      { label: '气泡卡片', route: 'popover', isActive: false },
      { label: '悬浮提示', route: 'tooltip', isActive: false },
      { label: '确认框', route: 'confirm', isActive: false }
    ]
  },
  {
    label: '其他组件', route: 'printer', isActive: false, children: [
      { label: '控制台打印', route: 'printer', isActive: false },
      { label: '分割线', route: 'divider', isActive: false },
      { label: '进度条', route: 'progress', isActive: false },
      { label: '边框', route: 'border', isActive: false },
      // { label: '滚动条', route: 'scroll', isActive: false },
      { label: '加载', route: 'loading', isActive: false },
    ]
  }
]
