/**
 * @description select通用工具
 * @author 阿怪
 * @date 2022/11/10 01:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from "../index";


export default function useSelectTools<T>(props: Required<SelectProps>) {
  const getInfoWithKey = (option: T, key: 'optionParam' | 'valueParam' | 'inputParam') => {
    if (!props[key]) {
      return option;
    }
    return option[props[key] as keyof T] as unknown;
  }

  const getInputValue = (option: T) => getInfoWithKey(option, 'inputParam') as string;

  const getModelValue = (option: T) => getInfoWithKey(option, 'valueParam') as T;


  return {
    getInfoWithKey, getInputValue, getModelValue,
  }
}
