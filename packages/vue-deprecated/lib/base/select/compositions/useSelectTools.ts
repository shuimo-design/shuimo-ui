/**
 * @description select通用工具
 * @author Jimmy
 * @date 2022/12/06 17:46
 * @version v1.0.0
 */
import { SelectProps } from '../index';

export type IsSelectOption<T> = {
  value: T,
  isSelected: boolean
};

export default function useSelectTools<T>(props: Required<SelectProps>) {

  type SelectOption = IsSelectOption<T>

  const getInfoWithKey = (option: T, key: 'optionParam' | 'valueParam' | 'inputParam') => {
    if (!props[key]) {
      return option;
    }
    return option[props[key] as keyof T] as unknown;
  };

  const getInputValue = (option: T) => getInfoWithKey(option, 'inputParam') as string;

  const getModelValue = (option: T) => getInfoWithKey(option, 'valueParam') as T;

  const selectFilter = (option: SelectOption, query: string) => {
    if (query) {
      return getInputValue(option.value) === query;
    }
    return true;
  };


  return {
    getInfoWithKey, getInputValue, getModelValue, selectFilter
  };
}
