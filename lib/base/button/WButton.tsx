/**
 * @Description: 按钮组件
 * @Author: 菩萨蛮
 * @Date: 2021/8/10 4:59 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'WButton',
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'primary' }
  },
  render(ctx: any) {
    const { disabled, type, text } = ctx;
    return h('button', {
      class: ['w-button w-cursor', { 'w-button-disabled': disabled }, `w-button-${type}`],
      disabled: disabled
    }, text);
  }
})
