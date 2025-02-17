/**
 * @description vue version li
 * @author 阿怪
 * @date 2023/05/04 17:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import MSvgIcon from '../../other/svg/MSvgIcon.tsx';
import './li.css';
import { LiCore } from '@shuimo-design/ui-core';
import { LiProps } from '@shuimo-design/ui-core/components/base/li/props';

const { props, useLi } = LiCore;

export default defineComponent((props: LiProps, ctx) => {
  const { renderInit } = useLi(props, ctx);

  return () => {

    const { class: liClass } = renderInit();

    return <li class={liClass}>
      {props.icon ? <div class="m-marker">
        <MSvgIcon wrapper={props.active} class="m-marker"/>
      </div> : null}
      <div class="m-li-inner">
        {ctx.slots.default?.()}
      </div>
    </li>;
  };
}, {
  name: 'MLi',
  props,
});
