/**
 * @description collapse component
 * @author 阿怪
 * @date 2025/02/17 20:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent } from 'vue';
import { CollapseCore } from '@shuimo-design/ui-core';
import { CollapseProps } from '@shuimo-design/ui-core/components/base/collapse/props';
import './collapse.css';
import { ARROW_ICON_ID } from '../../other/svg/MSvgSymbol';
import useSvgInject from '../../../compositions/common/useSvgInject';
import MDivider from '../../other/divider/MDivider';

const { useCollapse, collapseOptions } = CollapseCore;

export default defineComponent((_props: CollapseProps, ctx) => {
  const props = _props as Required<CollapseProps>;
  const { toggle, renderInit } = useCollapse(props, ctx);

  const { svgUrl, installIconSvg, isAuto } = useSvgInject(ARROW_ICON_ID);
  if (isAuto.value) {
    installIconSvg();
  }

  return () => {
    const { collapseClass, context } = renderInit();
    const line = props.line ? (<MDivider/>) : null;
    const arrow = <div class="m-collapse-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="8px" viewBox="0 0 28 16">
        <use href={svgUrl}></use>
      </svg>
    </div>;

    return (
      <div class={collapseClass}>
        <div class="m-collapse-header" onClick={toggle}>
          {ctx.slots.default?.()}
          {line}
          {arrow}
        </div>
        {context}
      </div>
    );
  };
}, collapseOptions);
