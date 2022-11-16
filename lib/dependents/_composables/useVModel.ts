/**
 * @description v-model hook
 * @author youus
 * @date 2022/4/6 23:56
 * @version v1.0.1
 *
 * v1.0.1 阿怪 增强类型及进出参数形式
 */

import { ref, Ref, UnwrapRef } from 'vue';

const useVModel = <T>(param: {
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange?: (newValue: UnwrapRef<T> | T, ...args: any[]) => void,
  emit?: (event: any, ...args: any[]) => void
}): [Ref<UnwrapRef<T> | T>, any] => {
  const { value, modelValue, defaultValue } = param;
  const _valueRef = ref(defaultValue);

  // 受控模式
  if (typeof value.value !== 'undefined') {
    return [value, param.onChange || (() => {})];
  }

  // 受控模式:modelValue
  if (typeof modelValue.value !== 'undefined') {
    return [
      modelValue,
      (newValue: UnwrapRef<T> | T, ...args: any[]) => {
        param.emit?.(UPDATE_MODEL, newValue, ...args);
        param.onChange?.(newValue, ...args);
      }
    ];
  }

  // 非受控模式
  return [
    _valueRef,
    (newValue: UnwrapRef<T>, ...args: any[]) => {
      _valueRef.value = newValue;
      param.onChange?.(newValue, ...args);
    }
  ];
};
export default useVModel;

// emits name
export const UPDATE_MODEL = 'update:modelValue';
