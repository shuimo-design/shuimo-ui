/**
 * @description shuimo svg wrapper component
 * @author 阿怪
 * @date 2024/1/9 14:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent } from 'vue';
import MSvgSymbol from './MSvgSymbol';

export default defineComponent((props, { slots }) => {
  return () => (
    <div class="shuimo-svg-wrapper">
      <MSvgSymbol/>
      {slots.default?.()}
    </div>
  );
}, {
  name: 'MSvgWrapper',
});
