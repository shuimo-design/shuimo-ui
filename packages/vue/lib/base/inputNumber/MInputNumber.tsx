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
      let val = e.target.value ?? value;
      if (val.indexOf('.') === 0) {
        val = val.replace(/^\./g, '0.');
      }
      if (/^-?\d+$/.test(val) && val.indexOf('0') === 0) {
        val = `${Number(val)}`;
        e.target.value = val;
      }
      validate(val, e);
    };

    const handleInputBlur = () => {
      const oldVal = currentValue.value;
      currentValue.value = String(currentValue.value).indexOf('.') === String(currentValue.value).length - 1 ? String(currentValue.value).replace(/\.$/g, '') : currentValue.value;
      updateInput(oldVal);
    };

    const validate = (value: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
      if (!isNaN(+value) || value === '') {
        setCurrentValue(value, e);
      } else {
        if (e) e.target.value = String(currentValue.value);
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
      } else if (precision !== 0 && String(newVal).includes('.') && (`${newVal}`.length - (`${newVal}`.indexOf('.') + 1) >= precision)) {
        newVal = Number(`${newVal}`.substring(0, `${newVal}`.indexOf('.') + (precision + 1)));
        if (e) {e.target.value = String(newVal);}
      }
      currentValue.value = newVal;
      updateInput(oldVal);
    };
    const updateInput = (oldVal: InputNumber) => {
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
        onBlur: handleInputBlur,
        value: currentValue.value
      }));
    };
  }
});
