/**
 * @description headless li
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { LiCore } from '@shuimo-design/ui-core';
import { LiProps } from '@shuimo-design/ui-core/components/base/li/props';
import './li.css';

const { props } = LiCore;

export default defineComponent((props: LiProps, { slots }) => {
  return () => {
    return <li class={['m-li', { 'm-li-active': props.active }]}>
      {props.marker ? <div class="m-marker">
        {slots.marker?.()}
      </div> : null}
      <div class="m-li-inner">
        {slots.default?.()}
      </div>
    </li>;
  };
}, {
  name: 'MLi',
  props,
});
