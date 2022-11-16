/**
 * @description 删除组件
 * @author 阿怪
 * @date 2022/11/10 23:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'MDeleteIcon',
  setup: () => {
    return () => {
      return h('div', { class: 'm-delete-icon' });
    };
  }
});
