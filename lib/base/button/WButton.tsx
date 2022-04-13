/**
 * @description 按钮组件
 * @author 阿怪
 * @date 2021/8/10 4:59 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 新增slot文本形式
 * v1.0.2 优化结构
 */
import { h, defineComponent } from 'vue';
import { props } from "./api";

export default defineComponent({
  name: 'WButton',
  props,
  setup(props, { slots }) {
    const { disabled, type, text } = props;
    return () => {
      let buttonText = slots.default && slots.default() || text;
      return h('button', {
        class: ['w-button', { 'w-button-disabled': disabled }, `w-button-${type}`],
        disabled: disabled
      }, buttonText);
    }
  }
})
