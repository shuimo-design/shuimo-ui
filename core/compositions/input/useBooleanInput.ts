/**
 * @description boolean input like checkbox/radio... hooks
 * @author 阿怪
 * @date 2023/4/23 15:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { isBoolean, notEmpty } from '../../tools';

export const initChecked = (props: {
  checked: boolean | null | undefined,
  modelValue: any,
  value: any
}) => {
  if (props.checked) {
    return props.checked;
  }

  if (notEmpty(props.modelValue)) {
    if (notEmpty(props.value)) {
      return props.value === props.modelValue;
    }

    if (isBoolean(props.modelValue)) {
      return props.modelValue;
    }
  }

  return false;
};


export const getNewModelValue = (props: { value: any }, checked: boolean) => {
  if (props.value) {
    return checked ? props.value : undefined;
  }
  return checked;
};
