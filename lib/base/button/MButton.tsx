/**
 * @description 按钮组件
 * @author 阿怪
 * @date 2021/8/10 4:59 下午
 * @version v2.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 新增slot文本形式
 * v1.0.2 优化结构
 * v1.0.3 添加link属性
 * v2.0.0 升级交互
 * v2.1.0 使用border方式实现边框模块
 */
import { h, defineComponent } from 'vue';
import { props } from "./api";

export default defineComponent({
  name: 'MButton',
  props,
  setup(props, { slots }) {
    const { disabled, type, text } = props;
    return () => {
      let buttonText = slots.default && slots.default() || text;
      const domType = props.link ? 'a' : 'button';
      return h(domType, {
        class: ['m-button', { 'm-button-disabled': disabled }, `m-button-${type}`],
        disabled: disabled
      }, buttonText);
    }
  }
})
