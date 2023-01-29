/**
 * @description element props hooks
 * @author 阿怪
 * @date 2022/12/20 17:33
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MElement from '../../MElement';
import { MCOPO, MPropType } from '@shuimo-design/types';


export const attributeTransform = (type: MPropType<any> | true | null, value: string) => {
  if (type === true || type === null) {return value;}

  if (Array.isArray(type)) { // array type not support yet.
    return value;
  }

  if (type.prototype === Boolean.prototype) {
    if (value === '') {
      return true;
    }
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

export const initElementProps = function (
  this: MElement,
  props?: MCOPO<any>
) {
  if (!props) {return;}
  Object.keys(props).forEach((key) => {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (props[key].type === undefined) {
          // return this.getAttribute(key);
          console.warn('trace this props');
          console.trace(props);
        }
        return attributeTransform(props[key].type!, this.getAttribute(key));
      },
      set(v: any) {
        this.setAttribute(key, v);
        this.update();
      }
    });
  });
};
