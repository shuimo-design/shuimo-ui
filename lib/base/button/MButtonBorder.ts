/**
 * @description 按钮边框组件
 * @author 阿怪
 * @date 2022/8/1 22:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 可以和边框组件提取公共代码
 */
import { defineComponent, h, VNode } from "vue";


export default defineComponent({
  name: 'MButtonBorder',
  setup(props, { slots }) {

    const baseBorderClass = 'm-button-border-line';

    enum borderType {
      topLeft = 'top-left',
      top = 'top',
      topRight = 'top-right',
      left = 'left',
      right = 'right',
      bottomLeft = 'bottom-left',
      bottom = 'bottom',
      bottomRight = 'bottom-right',
    }

    const borderList = Object.values(borderType).map(value => {
      return h('div', { class: [baseBorderClass, `m-button-border-${value}`] });
    });


    return () => {

      const main = h('div', { class: 'm-button-border-main' }, slots.default!());
      return h('div', {
        class: 'm-button-border'
      }, [main, borderList])
    }
  }
})
