/**
 * @description en i18n
 * @author 阿怪
 * @date 2024/4/4 01:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { home } from '~/i18n/components/home';
import { base } from '~/i18n/components/base';
import { template } from '~/i18n/components/template';
import { message } from '~/i18n/components/message';
import { other } from '~/i18n/components/other';

const menu = {
  '首页': 'Home',
  '快速开始': 'Quick Start',
  '进入组件': 'Components',
  '颜色': 'Color',
  '基础组件': 'Basic',
  '按钮': 'Button',
  '输入框': 'Input',
  '单选框': 'Radio',
  '复选框': 'Checkbox',
  '选择框': 'Select',
  '日期选择框': 'Date Picker',
  '列表': 'List',
  '开关': 'Switch',
  '标签': 'Tag',
  '滑动条': 'Slider',
  '模版组件': 'Template',
  '表单': 'Form',
  '表格': 'Table',
  '分页': 'Pagination',
  '宣纸布局': 'Rice Paper Layout',
  '边框': 'Border',
  '面包屑': 'Breadcrumb',
  '消息组件': 'Message',
  '弹窗': 'Dialog',
  '抽屉': 'Drawer',
  '提示': 'Message',
  '气泡卡片': 'Popover',
  '悬浮提示': 'Tooltip',
  '确认框': 'Confirm',
  '其他组件': 'Other',
  '控制台打印': 'Console Print',
  '分割线': 'Divider',
  '进度条': 'Progress',
  '加载': 'Loading',

};

const main = {
  '这是一款开箱即用的': 'This is an out-of-the-box',
  '水墨风': '水墨(shuimo) style',
  '组件库。': 'component library.',
  '我们注意到有许多优秀的企业级UI设计语言和组件库。': 'We have found that there are many excellent enterprise-level UI design languages and component libraries.',
  '作为炎黄子孙，我们十分推崇中国独有的美术风格：水墨。': 'As a Chinese, we highly respect the unique Chinese art style: shuimo.',
  '我们整理出了一套具有中国传统风格的水墨风组件库。': 'We have sorted out a set of Shuimo component library with traditional Chinese style.',
  '希望这款中国传统风格的组件库，能用于一些小众的需求，能满足于一些对页面有美术追求，又希望能快速搭建的用户。': 'I hope that this traditional Chinese-style component library can be used for some niche needs, and can satisfy some users who have an artistic pursuit of the site and hope to build it quickly.',
  '同时，我们希望能尽一分小小的力量，让更多人了解中国传统文化。': 'At the same time, we hope to contribute a little effort to help Chinese traditional culture become more widely known.',
};


export const en = {
  language: '中文',
  '水墨UI': 'Shuimo UI',
  '回到首页': 'home',
  '代码仓库': 'github',
  ...main,
  ...menu,
  ...home.en.color,
  ...home.en.quickStart,
  ...base.en,
  ...template.en,
  ...message.en,
  ...other.en,
};
