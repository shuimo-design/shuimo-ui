/**
 * @description headless border 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from '@shuimo-design/ui-core/components/template/border';
import './border.css';

export default defineComponent((_, { slots }) => {
  return () => {
    return <div class="m-border">
      {slots.default?.()}
    </div>;
  };
}, {
  name: 'MBorder',
  props,
});
