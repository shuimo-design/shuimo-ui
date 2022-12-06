/**
 * @description Input组件
 * @author 阿怪
 * @date 2020/11/17 22:03
 * @version v1.1.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.1.0 阿怪 升级为tsx版本
 * v1.1.1 阿怪 新增disabled和readonly属性
 * v1.1.2 阿怪 添加focus事件冒泡
 * v1.1.2 阿怪 添加blur事件冒泡
 */
import { defineComponent, h, toRefs } from 'vue';
import MBorder from '../../other/border/MBorder';
import { props } from './api';
import type { HTMLElementEvent } from '../../dependents/_types';

export default defineComponent({
  name: 'MInput',
  emits: ['update:modelValue', 'focus', 'blur'],
  props,
  setup(props, { emit }) {
    const { type, disabled } = toRefs(props);
    const borderClass = {
      class: ['m-input', { 'm-textarea': type.value === 'textarea' }, { 'm-input-disabled': disabled.value }]
    };

    return () => {
      const domProps = {
        value: props.modelValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        readOnly: props.readonly,
        onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
          emit('update:modelValue', e.target.value);
        },
        onFocus: (e: FocusEvent) => {
          emit('focus', e);
        },
        onBlur: (e: FocusEvent) => {
          emit('blur', e);
        }
      };

      if (type.value === 'textarea') {
        return h(MBorder, borderClass, () =>
          h('textarea', {
            rows: 10,
            class: 'm-textarea-inner',
            ...domProps
          })
        );
      }

      return h(MBorder, borderClass, () =>
        h('input', {
          type,
          class: 'm-input-inner',
          ...domProps
        })
      );
    };
  }
});
