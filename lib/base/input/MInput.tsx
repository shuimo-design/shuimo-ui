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
import MBorder from '../../other/border/MBorder';
import { props } from "./api";
import type { HTMLElementEvent } from "../../dependents/_types";


export default defineComponent({
  name: 'MInput',
  emits: ['update:modelValue'],
  props,
  setup(props, { emit }) {
    const { type } = props;
    const borderClass = { class: ['m-input', { 'm-textarea': type === 'textarea' }] };

    return () => {
      const domProps = {
        value: props.modelValue,
        placeholder: props.placeholder,
        onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
          emit('update:modelValue', e.target.value);
        }
      }


      if (type === 'textarea') {
        return h(MBorder, borderClass, () => h(
          'textarea', {
            rows: 10,
            class: 'm-textarea-inner',
            ...domProps
          }
        ))
      }

      return h(MBorder, borderClass, () => h(
        'input', {
          type,
          class: 'm-input-inner',
          ...domProps
        }
      ))
    }
  }
})
