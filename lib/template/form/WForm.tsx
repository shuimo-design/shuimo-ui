/**
 * @Description: 表单组件
 * @Author: 阿怪
 * @Date: 2022/2/13 12:28 AM
 * @Version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.1.0 @author 阿怪 重构为tsx版本，并添加submit事件劫持
 */

import { h, defineComponent, useSlots } from 'vue';

export default defineComponent({
  name: 'WForm',
  props: {
    inline: Boolean,
    submit: {
      type: Boolean,
      default: false
    }
  },
  render(ctx: any) {
    const slots = useSlots();
    return h('form', {
      ...ctx.$props,
      onsubmit: () => {
        return ctx.$props.submit;
      }
    }, slots);
  }
})

