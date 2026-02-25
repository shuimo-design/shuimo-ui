/**
 * @description select 参数映射工具
 * @author 阿怪
 * @date 2026/2/25 14:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 处理 options 中对象数据的 key 映射
 * inputParam: 选中后输入框显示哪个字段
 * optionParam: 下拉列表中显示哪个字段
 * valueParam: modelValue 绑定哪个字段
 */
import { SelectProps } from './props';

export type SelectParamKeys = 'optionParam' | 'valueParam' | 'inputParam';

export function useSelectTools(props: SelectProps) {

  /** 从 option 中取指定 key 的值 */
  const getInfoWithKey = (option: any, key: SelectParamKeys): any => {
    const paramKey = props[key];
    if (!paramKey) return option;
    try {
      return option[paramKey];
    } catch {
      return option;
    }
  };

  /** 输入框显示值 */
  const getInputValue = (option: any): string => {
    return String(getInfoWithKey(option, 'inputParam') ?? '');
  };

  /** 下拉列表显示值 */
  const getOptionValue = (option: any): string => {
    return String(getInfoWithKey(option, 'optionParam') ?? '');
  };

  /** modelValue 绑定值 */
  const getModelValue = (option: any): any => {
    if (props.valueParam) {
      return getInfoWithKey(option, 'valueParam');
    }
    return option;
  };

  return { getInfoWithKey, getInputValue, getOptionValue, getModelValue };
}
