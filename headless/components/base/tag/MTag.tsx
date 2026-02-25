/**
 * @description headless tag
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { TagCore } from '@shuimo-design/ui-core';
import { TagProps } from '@shuimo-design/ui-core/components/base/tag/props';
import './tag.css';

const { props } = TagCore;

export default defineComponent((props: TagProps, { slots }) => {
  return () => {
    return <div class={['m-tag', `m-tag-${props.type}`]}>
      {slots.default?.() ?? ''}
    </div>;
  };
}, {
  name: 'MTag',
  props,
});
