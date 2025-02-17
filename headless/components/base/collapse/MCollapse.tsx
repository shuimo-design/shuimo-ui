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
import MDivider from '../../other/divider/MDivider';

const { useCollapse, collapseOptions } = CollapseCore;

export default defineComponent((_props: CollapseProps, ctx) => {
  const props = _props as Required<CollapseProps>;
  const { toggle, renderInit } = useCollapse(props, ctx);

  return () => {
    const { collapseClass, context } = renderInit();
    const line = props.line ? (<MDivider />) : null;

    return (
      <div class={collapseClass}>
        <div class="m-collapse-header" onClick={toggle}>
          {ctx.slots.default?.() }
          {line}
          <div class="m-collapse-arrow">&lt;</div>
        </div>
        {context}
      </div>
    );
  };
}, collapseOptions);
