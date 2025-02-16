/**
 * @description headless divider
 * @author 阿怪
 * @date 2025/2/16 23:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { DividerProps } from '@shuimo-design/ui-core/components/other/divider/props';
import { DividerCore } from '@shuimo-design/ui-core';
import './divider.css';

const { props } = DividerCore;

export default defineComponent((props: DividerProps) => {
  return () => <div class={{
    'm-divider': true,
    'm-divider-vertical': props.vertical
  }}/>;
}, {
  name: 'MDivider',
  props
}); 