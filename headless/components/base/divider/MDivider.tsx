/**
 * @description headless divider 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { DividerCore } from '@shuimo-design/ui-core';
import { DividerProps } from '@shuimo-design/ui-core/components/base/divider/props';
import './divider.css';

const { props } = DividerCore;

export default defineComponent((props: DividerProps) => {
  return () => <div class={{
    'm-divider': true,
    'm-divider-vertical': props.vertical,
  }}/>;
}, {
  name: 'MDivider',
  props,
});
