/**
 * @description list component
 * @author 阿怪
 * @date 2022/4/24 21:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { props } from './api';

export default defineComponent({
  name: 'MList',
  props,
  setup(props, { slots }) {
    return () => {
      const icon = h('div', { class: 'm-list-icon' });
      const listItems = props.data?.map(item => h('div', {
        class: ['m-list-item', props.autoActive || item.active ? 'm-active' : ''],
      },  [
        icon,
        h(
          'div',
          { class: 'm-list-item-main' },
          slots.default ? slots.default.call(this, item) : JSON.stringify(item)
        )
      ]));

      return h('div', { class: 'm-list' }, listItems);
    };
  }
});
