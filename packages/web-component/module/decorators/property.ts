/**
 * @description
 * @author 阿怪
 * @date 2022/12/13 17:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MPropOptionsBase } from '@shuimo-design/core/types/template/props';

export const attributeTransform = (type: MPropOptionsBase['type'], value: string) => {

  if (type.prototype === Boolean.prototype) {
    if (value === null || value === undefined) {
      return value;
    }
    return value === 'true';
  }
  if (type.prototype === Number.prototype) {
    return Number(value);
  }

  return value;

};
