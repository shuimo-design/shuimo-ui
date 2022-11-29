/**
 * @description select通用工具
 * @author 阿怪
 * @date 2022/11/10 01:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from "../index";
import { computed, Ref, watchEffect } from "vue";

export default function useSelectTools<T>(props: Required<SelectProps>) {
  const getInfoWithKey = (option: T, key: 'optionParam' | 'valueParam' | 'inputParam') => {
    if (!props[key]) {
      return option;
    }
    return option[props[key] as keyof T] as unknown;
  }

  const getInputValue = (option: T) => getInfoWithKey(option, 'inputParam') as string;

  const getModelValue = (option: T) => getInfoWithKey(option, 'valueParam') as T;

  // 多选状态下input的大小
  const selectMultipeInput = (input: Ref<HTMLInputElement | null>, inputValue: Ref<string>) => {
    if (input.value) {
      const inputFontSize = input.value!.style.fontSize
        ? parseInt(input.value!.style.fontSize.slice(0, input.value!.style.fontSize.indexOf('px'))) - 6
        : 12
      watchEffect(
        () => {
          // 动态修改 placeholder
          input.value!.placeholder = props.modelValue.length !== 0 ? '' : props.placeholder
          const inputPlaceholderLength = input.value!.placeholder ? input.value!.placeholder.length : 6
          input.value!.style.width = `${inputFontSize * inputPlaceholderLength}px`
        });
      // 操作输入框自适应大小
      input.value.oninput = () => {
        const inputSize = inputValue.value.length
        if (inputFontSize * inputSize < 220) {
          input.value!.style.width = `${inputFontSize * inputSize}px`
        }
      }
    }
  };
  const selectFuzzyFilter = (inputValue: string) => {
    const list = computed(() => props.options.map(option => getInputValue(option)))
    const reg = new RegExp(inputValue);
    const arr = [];
    for (let i = 0; i < list.value.length; i++) {
      if (reg.test(list.value[i])) {
        arr.push(props.options[i]);
      }
    }
    return arr;
  }

  return {
    getInfoWithKey, getInputValue, getModelValue, selectMultipeInput, selectFuzzyFilter
  }
}
