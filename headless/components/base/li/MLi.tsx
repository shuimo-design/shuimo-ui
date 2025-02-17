/**
 * @description
 * @author 阿怪
 * @date 2025/02/17 10:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LiCore } from '@shuimo-design/ui-core';
import { LiProps } from '@shuimo-design/ui-core/components/base/li/props';
import { defineComponent } from 'vue';
import './li.css';

const { props, useLi } = LiCore;

export default defineComponent((props: LiProps, ctx) => {
  const { renderInit } = useLi(props, ctx);

  return () => {
    const { class: liClass } = renderInit();
    return <li class={liClass}>
      <div class="m-li-inner">
        {ctx.slots.default?.()}
      </div>
    </li>;
  };
}, {
  name: 'MLi',
  props,
});
