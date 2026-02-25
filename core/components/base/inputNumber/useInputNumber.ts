/**
 * @description inputNumber composable
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, watch } from 'vue';
import { InputNumberProps } from './props';
import { HTMLElementEvent } from '../../types/template';

export type InputNumber = string | number;

export default function useInputNumber(props: Required<InputNumberProps>, ctx: any) {
  const currentValue = ref<InputNumber>(props.modelValue);

  const updateInput = (oldVal: InputNumber) => {
    ctx.emit('update:modelValue', currentValue.value);
    ctx.emit('change', currentValue.value, oldVal);
  };

  const setCurrentValue = (newVal: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
    const oldVal = currentValue.value;
    const { min, max, precision } = props;
    if (oldVal === newVal) {
      return;
    } else if (+newVal >= +max) {
      // 超过最大值，截断到 max
      newVal = max;
    } else if (+newVal <= +min) {
      // 低于最小值，截断到 min
      newVal = min;
    } else if (
      precision !== 0 &&
      String(newVal).includes('.') &&
      (`${newVal}`.length - (`${newVal}`.indexOf('.') + 1) >= precision)
    ) {
      // 按精度截断小数位
      newVal = Number(`${newVal}`.substring(0, `${newVal}`.indexOf('.') + (precision + 1)));
    }
    if (e) { e.target.value = String(newVal); }
    currentValue.value = newVal;
    updateInput(oldVal);
  };

  const validate = (value: InputNumber, e?: HTMLElementEvent<HTMLInputElement>) => {
    // 合法值：数字、空字符串、负号前缀（用户正在输入负数）
    if (!isNaN(+value) || value === '' || value === '-') {
      setCurrentValue(value, e);
    } else {
      // 非法输入，还原为当前值
      if (e) e.target.value = String(currentValue.value);
    }
  };

  const handleInputChange = (e: HTMLElementEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // 处理以小数点开头的输入，补充整数部分 0
    if (val.indexOf('.') === 0) {
      val = val.replace(/^\./g, '0.');
    }
    // 处理整数部分多余前导零
    if (/^-?\d+$/.test(val) && val.indexOf('0') === 0) {
      val = `${Number(val)}`;
      e.target.value = val;
    }
    validate(val, e);
  };

  const handleInputBlur = () => {
    // blur 时清理末尾的负号
    if (currentValue.value === '-') {
      currentValue.value = '';
    } else if (currentValue.value === '-0') {
      currentValue.value = 0;
    }
    const oldVal = currentValue.value;
    const str = String(currentValue.value);
    // 清理末尾小数点
    currentValue.value = str.indexOf('.') === str.length - 1
      ? str.replace(/\.$/g, '')
      : currentValue.value;
    updateInput(oldVal);
  };

  // 监听外部 modelValue 变化，同步内部值
  watch(() => props.modelValue, val => {
    validate(val);
  });

  return {
    currentValue,
    handleInputChange,
    handleInputBlur,
    validate,
  };
}
