/**
 * @description
 * @author 阿怪
 * @date 2023/4/23 16:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { Slot } from '../types';
import { MCOPO, MPropOptionsWithDefault } from '@shuimo-design/types';


export const withDefault = <T>(props: T, option: MCOPO<T>) => {
  const defaultObj: Partial<T> = {};
  Object.keys(option).forEach(k => {
    const key = k as keyof MCOPO<T>;
    const optionKey = option[key] as MPropOptionsWithDefault;
    if (props[key] === undefined && optionKey.default) {
      defaultObj[key] = optionKey.default;
    }
  });

  return {
    ...defaultObj,
    ...props
  } as Required<T> & Slot;
};


export const getSlot = (props: Slot, name: string) => {
  if (!Array.isArray(props.children)) {return [];}

  const nameIndex = props.children.findIndex((item: any) => item.props.slot === name);
  if (nameIndex === -1) {
    throw new Error(`slot ${name} is required`);
  }
  const nameNode = props.children[nameIndex];
  const defaultNode = props.children.filter((_, i) => i !== nameIndex);

  return [nameNode, defaultNode];
};
