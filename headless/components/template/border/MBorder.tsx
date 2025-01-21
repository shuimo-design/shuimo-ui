/**
 * @description headless border component
 * @author 阿怪
 * @date 2025/1/21 16:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { BorderCore } from '@shuimo-design/ui-core';
import './border.css';

const { borderOptions, useBorder } = BorderCore;

export default defineComponent((props, ctx) => {


  const { renderInit } = useBorder(props, ctx);

  return () => {
    const { renderTypes } = renderInit();
    const lines = renderTypes.map(type => `m-border-${type}-line`);
    const borderClass = ['m-border',  props.mask ?'m-border-with-mask':'', ...lines];

    if (props.insteadMain) {
      // default mast only one slot
      const node = ctx.slots.default?.()[0];
      if(node?.props?.class){
        // hack way to add class
        node.props.class += ` ${borderClass.join(' ')}`;
      }else if(node){
        node.props = node.props || {};
        node.props.class = borderClass.join(' ');
      }
      return node;
    }

    return <div class={borderClass}>
      {ctx.slots.default?.()}
    </div>;
  };

}, borderOptions);
