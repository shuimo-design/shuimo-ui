/**
 * @description core inputNumber hook
 * @author 阿怪
 * @date 2023/06/06 23:33
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { InputNumberProps } from './index';
import { HTMLElementEvent } from '../../types/template';
import { Options } from '../../../compositions/common/defineCore.ts';
import { ref } from 'vue';

export type InputNumber = string | number;

export function useInputNumber(options: Options<{
  props: InputNumberProps,
  value: {
    currentValueRef: InputNumber
  },
  event: {
    updateInput: (value: InputNumber) => void
  }
}>) {
  const { props, value, event } = options;
  const currentValue = ref(value.currentValueRef);
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
    if (currentValue.value === '-') {
      currentValue.value = '';
    } else if (currentValue.value === '-0') {
      currentValue.value = 0;
    }
    const oldVal = currentValue.value;
    const str = String(currentValue.value);
    currentValue.value = str.indexOf('.') === str.length - 1 ?
      str.replace(/\.$/g, '') : currentValue.value;
    event.updateInput(oldVal);
  };

  const setCurrentValue = (newVal: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
    const oldVal = currentValue.value;
    const { min, max, precision } = props;
    if (+newVal >= +max) {
      newVal = max;
      if (e) {e.target.value = String(newVal);}
    } else if (+newVal <= +min) {
      newVal = min;
    } else if (oldVal === newVal) {
      return;
    } else if (precision !== 0 && String(newVal).includes('.') && (`${newVal}`.length - (`${newVal}`.indexOf('.') + 1) >= precision)) {
      newVal = Number(`${newVal}`.substring(0, `${newVal}`.indexOf('.') + (precision + 1)));
      if (e) {e.target.value = String(newVal);}
    }
    currentValue.value = newVal;
    event.updateInput(oldVal);
  };

  const validate = (value: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
    if (!isNaN(+value) || value === '' || value === '-') {
      setCurrentValue(value, e);
    } else {
      if (e) e.target.value = String(currentValue.value);
    }
  };


  return {
    handleInputChange,
    handleInputBlur,
    validate,
  };

}
