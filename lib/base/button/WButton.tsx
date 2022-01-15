/**
 * @Description: 按钮组件
 * @Author: 菩萨蛮
 * @Date: 2021/8/10 4:59 下午
 * @Version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 新增slot文本形式
 */
import { h, defineComponent, useSlots } from 'vue';

export default defineComponent({
  name: 'WButton',
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'primary' }
  },
  render(ctx: any) {
    let { disabled, type, text } = ctx;
    const slots = useSlots();
    if (slots.default) {
      text = slots.default();
    }
    return h('button', {
      class: ['w-button w-cursor', { 'w-button-disabled': disabled }, `w-button-${type}`],
      disabled: disabled
    }, text);
  }
})
