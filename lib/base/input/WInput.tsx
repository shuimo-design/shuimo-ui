/**
 * @description Input组件
 * @author 阿怪
 * @date 2020/11/17 22:03
 * @version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.1.0 阿怪 升级为tsx版本
 */
import { defineComponent, h } from 'vue';
import WBorder from '../../other/border/WBorder';
import { props } from "./api";
import type { OptionType } from "./index";

export default defineComponent({
  name: 'WInput',
  components: { WBorder },
  emits: ['update:modelValue'],
  props,
  render(ctx: OptionType['ctx']) {
    const { type } = ctx;
    const domProps = {
      value: ctx.modelValue,
      placeholder: ctx.placeholder,
      onInput: (e: InputEvent) => {
        // @ts-ignore why EventTarget not include value?
        this.$emit('update:modelValue', e.target.value);
      }
    }

    const borderClass = { class: ['w-input', { 'w-textarea': type === 'textarea' }] };

    if (type === 'textarea') {
      return h(WBorder, borderClass, () => h(
        'textarea', {
          rows: 10,
          class: 'w-textarea-inner',
          ...domProps
        }
      ))
    }

    return h(WBorder, borderClass, () => h(
      'input', {
        type,
        class: 'w-input-inner',
        ...domProps
      }
    ))
  }
})
