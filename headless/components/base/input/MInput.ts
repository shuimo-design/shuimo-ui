/**
 * @description headless input
 * @author 阿怪
 * @date 2024/12/3 10:09
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent, h } from 'vue';
import { InputCore } from '@shuimo-design/ui-core';
import { InputProps } from '@shuimo-design/ui-core/components/base/input/props';
import './input.css';

const { useInput, props } = InputCore;

export default defineComponent((props: InputProps, { emit }) => {
  const {
    renderInit,
    inputType, onInput, onFocus, onBlur,
    inputClass,
    rowInfo,
  } = useInput(props, { emit });

  return () => {
    const { baseProps } = renderInit();

    return h(inputType, { class: 'm-input' }, {
      ...baseProps,
      onInput, onFocus, onBlur,
      class: inputClass,
      ...rowInfo,
    });
  };

}, {
  name: 'MInput',
  emits: ['update:modelValue', 'focus', 'blur', 'input'],
  props,
});
