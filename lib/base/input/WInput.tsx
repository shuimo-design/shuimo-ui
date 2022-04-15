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
import { defineComponent, h, toRef, toRefs } from 'vue';
import WBorder from '../../other/border/WBorder';
import { props } from "./api";
import { HTMLElementEvent } from "../../types/base";


export default defineComponent({
  name: 'WInput',
  emits: ['update:modelValue'],
  props,
  setup(props, { emit }) {
    const { type } = props;
    const borderClass = { class: ['w-input', { 'w-textarea': type === 'textarea' }] };

    return () => {
      const domProps = {
        value: props.modelValue,
        placeholder: props.placeholder,
        onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
          emit('update:modelValue', e.target.value);
        }
      }


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
  }
})
