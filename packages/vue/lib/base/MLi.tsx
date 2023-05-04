/**
 * @description vue version li
 * @author 阿怪
 * @date 2023/05/04 17:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { props } from '@shuimo-design/core/lib/base/li/api';

export default defineComponent({
  name: 'MLi',
  props,
  setup: (props, { slots }) => {
    return () => {
      return <li class={['m-li', { 'm-li-active': props.active }]}>
        {slots.default?.()}
      </li>;
    };
  }
});
