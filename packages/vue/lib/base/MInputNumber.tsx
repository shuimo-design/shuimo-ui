/**
 * @description vue version inputNumber
 * @author 阿怪
 * @date 2023/06/06 23:33
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h, ref, watch } from 'vue';
import { props } from '@shuimo-design/core/lib/base/inputNumber/api';
import MBorder from '../template/MBorder';
import { InputNumber, useInputNumber } from '@shuimo-design/core/lib/base/inputNumber/useInputNumber';


export default defineComponent({
  name: 'MInputNumber',
  emits: ['update:modelValue', 'change'],
  props: {
    ...props,
    value: undefined,
    modelValue: props.value
  },
  setup: (props, { slots, emit }) => {
    const currentValue = ref<InputNumber>(props.modelValue);

    const updateInput = (oldVal: InputNumber) => {
      emit('update:modelValue', currentValue.value);
      emit('change', currentValue.value, oldVal);
    };

    const { handleInputChange, handleInputBlur, validate } = useInputNumber({
      props,
      value: { currentValueRef: currentValue },
      event: {
        updateInput
      }
    });

    watch(() => props.modelValue, (val) => {
      validate(val);
    });

    return () => {
      const inputProps = {
        value: currentValue.value,
        placeholder: props.placeholder,
        disabled: props.disabled,
        readOnly: props.readonly,
        onInput: handleInputChange,
        onBlur: handleInputBlur,
        onFocus: () => {}
      };


      return <MBorder class="m-input m-input-number">
        <input {...inputProps} class="m-input-inner" type="text"/>
      </MBorder>;
    };
  }
});
