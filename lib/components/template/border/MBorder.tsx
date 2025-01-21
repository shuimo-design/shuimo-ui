/**
 * @description 边框组件
 * @author 阿怪
 * @date 2021/8/23 8:45 下午
 * @version v2.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 阿怪 upgrade to core version
 * v2.0.1 阿怪 support instead of main div
 */

import { defineComponent } from 'vue';
import { WCSetup } from '../../types/template';
import './border.css';
import { BorderCore } from '@shuimo-design/ui-core';


const { borderOptions, baseLineClass, useBorder } = BorderCore;


export const MBorderSetup: WCSetup = slot => {
  return (props, ctx) => {
    const { renderInit } = useBorder(props, ctx);
    return () => {
      const { renderTypes } = renderInit();
      const renderSlot = slot ?? ctx.slots.default?.();
      const lineTemplate = renderTypes.map(type => {
        return <div class={[baseLineClass, `m-border-${type}-line`]}/>;
      });


      const main = props.insteadMain ?
        renderSlot :
        <div class={['m-border-main', { 'm-border-with-mask': props.mask }]}>{renderSlot}</div>;

      return <div class="m-border">
        {main}
        {lineTemplate}
      </div>;
    };
  };
};


export default defineComponent(MBorderSetup(), borderOptions);
