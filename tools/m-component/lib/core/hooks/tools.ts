/**
 * @description some rude tools
 * @author 阿怪
 * @date 2022/12/26 04:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeSlot, MNodeTemplate } from '../../../types/template/template';

export const isEqual = (obj1: any, obj2: any) => {
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  let _obj1 = obj1;
  let _obj2 = obj2;
  if (typeof _obj1 !== 'object' || typeof _obj2 !== 'object') {
    return _obj1 === _obj2;
  }

  const obj1Props = Object.getOwnPropertyNames(_obj1);
  const obj2Props = Object.getOwnPropertyNames(_obj2);
  if (obj1Props.length !== obj2Props.length) {
    return false;
  }


  for (const prop of obj1Props) {
    const val1 = obj1[prop];
    const val2 = obj2[prop];

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      if (isEqual(val1, val2)) {
        continue;
      } else {
        return false;
      }
    }
    if (val1 !== val2) {
      return false;
    }
  }
  return true;
};

export const getSlot = (slot: MNodeTemplate['slots']): Map<string, MNodeSlot> => {
  // todo add index
  if (slot && !Array.isArray(slot)) {
    return slot;
  }
  const slotMap: Map<string, MNodeSlot> = new Map();
  if (slot) {
    slot.forEach((name) => {
      slotMap.set(name, {});
    });
  }
  return slotMap;
};
