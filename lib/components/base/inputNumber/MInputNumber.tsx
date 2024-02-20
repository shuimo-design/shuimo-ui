/**
 * @description vue version inputNumber
 * @author 阿怪
 * @date 2023/06/06 23:33
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, watch } from 'vue';
import { props } from './api.ts';
import MBorder from '../../template/border/MBorder.tsx';
import { InputNumber, useInputNumber } from './useInputNumber.ts';
import './inputNumber.css';
import { InputNumberProps } from './index';

export default defineComponent((_props: InputNumberProps, { emit }) => {
  const props = _props as Required<InputNumberProps>;
  const currentValue = ref<InputNumber>(props.modelValue);

  const updateInput = (oldVal: InputNumber) => {
    emit('update:modelValue', currentValue.value);
    emit('change', currentValue.value, oldVal);
  };

  const { handleInputChange, handleInputBlur, validate } = useInputNumber({
    props,
    value: { currentValueRef: currentValue },
    event: {
      updateInput,
    },
  });

  watch(() => props.modelValue, val => {
    validate(val);
  });

  return () => {
    const inputProps: Record<keyof HTMLElement & HTMLInputElement, any> = {
      value: currentValue.value,
      placeholder: props.placeholder,
      disabled: props.disabled,
      readOnly: props.readonly,
      onInput: handleInputChange,
      onBlur: handleInputBlur,
      onFocus: () => {},
    };


    return <MBorder class="m-input m-input-number">
      <input {...inputProps} class="m-input-inner" type="text"/>
    </MBorder>;
  };
}, {
  name: 'MInputNumber',
  emits: ['update:modelValue', 'change'],
  props,
});
