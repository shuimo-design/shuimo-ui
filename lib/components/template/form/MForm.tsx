/**
 * @description vue version form
 * @author 阿怪
 * @date 2023/05/04 20:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { props } from './api.ts';
import './form.css';

export default defineComponent((props, { slots }) => {
  return () => {
    return h('form', {
      class: {
        'm-form': true,
        'm-form-inline': props.inline
      },
      onsubmit: () => props.submit
    }, slots);
  };
}, {
  name: 'MForm',
  props
});
