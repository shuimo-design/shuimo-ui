/**
 * @description 标签组件
 * @author 阿怪
 * @date 2022/8/11 01:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { props } from './api';

export default defineComponent({
  name: 'MTag',
  props,
  setup: (props, { slots }) => {
    return () => {
      const tagMain = h(
        'div',
        {
          class: ['m-tag-main']
        },
        slots
      );

      const tagLeft = <div class="m-tag-left"></div>;
      const tagRight = <div class="m-tag-right"></div>;

      return h(
        'div',
        {
          class: ['m-tag', `m-tag-${props.type}`]
        },
        [tagLeft, tagMain, tagRight]
      );
    };
  }
});
