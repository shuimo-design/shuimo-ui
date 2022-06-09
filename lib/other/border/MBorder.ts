/**
 * @description 边框组件
 * @author 阿怪
 * @date 2021/8/23 8:45 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { h, defineComponent, VNode } from 'vue';
import Printer from "../printer/Printer";

const printer = Printer();

export default defineComponent({
  name: 'MBorder',
  render(ctx: any) {

    const baseLineClass = 'm-border-line';

    enum lineType {
      top = 'top',
      left = 'left',
      right = 'right',
      bottom = 'bottom',
    }

    const lineList = Object.keys(lineType).map(key => {
      return h('div', { class: [baseLineClass, `m-border-${key}-line`] });
    });

    const slotList = ctx.$slots.default();
    if (slotList.length > 1) {
      printer.error('插槽暂时只支持一个');
      return h('div');
    }

    const slot: VNode = slotList[0];


    const main = h('div', { class: 'm-border-main' }, slot);

    return h('div', {
        class: 'm-border'
      },
      [main, lineList]
    )
  }
})
