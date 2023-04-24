/**
 * @description 标签组件
 * @author 阿怪
 * @date 2022/8/11 01:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { props } from '@shuimo-design/core/lib/base/tag/api';

export default defineComponent({
  name: 'MTag',
  props,
  setup: (props, { slots }) => {
    return () => {
      return <div class={['m-tag', `m-tag-${props.type}`]}>
        <div class="m-tag-left"/>
        <div class="m-tag-main">
          {slots.default?.() ?? ''}
        </div>
        <div class="m-tag-right"/>
      </div>
    };
  }
});
