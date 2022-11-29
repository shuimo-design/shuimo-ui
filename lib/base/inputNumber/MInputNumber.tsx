import { h, defineComponent, ref, watch, toRefs } from 'vue';
import MBorder from '../../other/border/MBorder';
import { props } from './api';
import { HTMLElementEvent } from '../../dependents/_types';

export type InputNumber = string | number;
export default defineComponent({
  name: 'MInputNumber',
  emits: ['update:modelValue', 'change'],
  props,
  setup(props, { emit }) {
    const { placeholder, disabled, modelValue } = toRefs(props);
    const currentValue = ref<InputNumber>(modelValue.value);

    const handleInputChange = (e: HTMLElementEvent<HTMLInputElement>, value?: InputNumber) => {
      const val = e.target.value ?? value;
      validate(val, e);

    };
    const validate = (value: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
      if (!isNaN(+value) || value === '') {
        setCurrentValue(value, e);
      }
    };
    const setCurrentValue = (newVal: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
      const oldVal = currentValue.value;
      const { min, max, precision } = props;
      if (+newVal >= max) {
        newVal = max;
        if (e) {e.target.value = String(newVal);}
      } else if (newVal <= min) {
        newVal = min;
      } else if (oldVal === newVal) {
        return;
      } else if (precision !== 0 && (`${newVal}`.length - (`${newVal}`.indexOf('.') + 1) >= precision)) {
        newVal = Number(`${newVal}`.substring(0, `${newVal}`.indexOf('.') + (precision + 1)));
        if (e) {e.target.value = String(newVal);}
      }
      currentValue.value = newVal;
      emit('update:modelValue', currentValue.value);
      emit('change', currentValue.value, oldVal);
    };
    watch(() => props.modelValue, (val) => {
      validate(val);
    });


    return () => {
      return h(MBorder, { class: 'm-input-number' }, () => h('input', {
        disabled: disabled.value,
        placeholder: placeholder.value,
        class: 'm-input-number-inner',
        onInput: handleInputChange,
        value: currentValue.value
      }));
    };
  }
});
