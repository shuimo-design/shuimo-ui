/**
 * @description 边框组件
 * @author 阿怪
 * @date 2021/8/23 8:45 下午
 * @version v2.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 阿怪 upgrade to core version
 */

import { defineComponent } from 'vue';
import { baseLineClass, lineType } from './lineType.ts';
import { WCSetup } from '../../types/template';
import './border.css';
import { props } from './api.ts';


const toBoolean = (value: any) => {
  if (value === 'false') return false;
  return Boolean(value);
};

export const MBorderSetup: WCSetup = slot => {
  return (props, { slots }) => {
    return () => {
      const renderSlot = slot ?? slots.default?.();
      const lineTemplate = Object.keys(lineType)
        .filter(type => toBoolean(props[type]))
        .map(type => {
          return <div class={[baseLineClass, `m-border-${type}-line`]}/>;
        });

      return <div class="m-border">
        <div class="m-border-main">
          {renderSlot}
        </div>
        {lineTemplate}
      </div>;
    };
  };
};


export default defineComponent(MBorderSetup(), {
  name: 'MBorder',
  props,
});
