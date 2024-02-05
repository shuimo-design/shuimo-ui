/**
 * @description 标签组件
 * @author 阿怪
 * @date 2022/8/11 01:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from './api.ts';
import { TagProps } from './index';
import './tag.css';

export default defineComponent((props: TagProps, { slots }) => {
  return () => {
    return <div class={['m-tag', `m-tag-${props.type}`]}>
      <div class="m-tag-left"/>
      <div class="m-tag-main">
        {slots.default?.() ?? ''}
      </div>
      <div class="m-tag-right"/>
    </div>;
  };
}, {
  name: 'MTag',
  props
});
