/**
 * @description 边框组件
 * @author 阿怪
 * @date 2021/8/23 8:45 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { h, defineComponent, VNode, onMounted, reactive, watchEffect } from 'vue';
import Printer from "../printer/Printer";
import { notEmpty } from "../../dependents/_utils/tools";

const printer = Printer();

export default defineComponent({
  name: 'WBorder',
  render(ctx: any) {

    const baseLineClass = 'w-border-line';

    enum lineType {
      top = 'top',
      left = 'left',
      right = 'right',
      bottom = 'bottom',
    }

    const lineList = Object.keys(lineType).map(key => {
      return h('div', { class: [baseLineClass, `w-border-${key}-line`] });
    });

    const slotList = ctx.$slots.default();
    if (slotList.length > 1) {
      printer.error('插槽暂时只支持一个');
      return h('div');
    }

    const slot: VNode = slotList[0];


    const main = h('div', { class: 'w-border-main' }, slot);

    return h('div', {
        class: 'w-border'
      },
      [main, lineList]
    )
  }
})
