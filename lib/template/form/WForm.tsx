/**
 * @description 表单组件
 * @author 阿怪
 * @date 2022/2/13 12:28 AM
 * @version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.1.0 @author 阿怪 重构为tsx版本，并添加submit事件劫持
 */

import { h, defineComponent, useSlots } from 'vue';
import { props } from "./api";
import type { OptionType } from "./form";

export default defineComponent({
  name: 'WForm',
  props,
  setup(props){
    const slots = useSlots();
    return h('form', {
      class: {
        'w-form': true,
        'inline': props.inline
      },
      onsubmit: () => {
        return props.submit;
      }
    }, slots);
  }
})

