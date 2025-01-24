/**
 * @description scroll component
 * @author 阿怪
 * @date 2025/1/25 00:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import './scroll.css';

export default defineComponent((_, { slots }) => {
  return () => {
    return <div class="m-scroll">{slots.default?.()}</div>;
  };
}, {
  name: 'MScroll',
});
