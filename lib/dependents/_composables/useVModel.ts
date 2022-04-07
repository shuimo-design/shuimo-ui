import { ref, Ref, getCurrentInstance } from 'vue';
import {ComponentInternalInstance} from '@vue/runtime-core';

// 用于实现 v-model
export default function useVModel(
  value: Ref<any>,
  modelValue: Ref<any>,
  defaultValue: any,
  onChange: any,
){
  const internalValue = ref(defaultValue);
  const { emit } = getCurrentInstance() as ComponentInternalInstance;

  // 受控模式
  if (typeof value.value !== 'undefined') {
    return [value, onChange || (() => {})];
  }

  // 受控模式:modelValue
  if (typeof modelValue.value !== 'undefined') {
    return [
      modelValue,
      (newValue: any, ...args: any[]) => {
        emit?.(`update:modelValue`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue: any, ...args: any[]) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}

// emits name
export const UPDATE_MODEL = 'update:modelValue';
