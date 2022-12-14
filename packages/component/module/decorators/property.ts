/**
 * @description
 * @author 阿怪
 * @date 2022/12/13 17:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MPropOptions, MPropOptionsBase, MPropOptionsWithDefault } from '@shuimo-design/core/types/template/props';
import ShuimoElement from '../elements/ShuimoElement';


export const property = (options: MPropOptions | MPropOptionsWithDefault) => {

  return (target: unknown, name: string) => {

    const element = target as ShuimoElement;

    element.defineProperty(name, 'property');

    // Object.defineProperty(element, name, {
    //   get() {
    //     return element.getAttribute(name);
    //   },
    //   set(value: any) {
    //     element.setAttribute(name, value);
    //     console.log('set');
    //     element.update();
    //   }
    // })
  };

};


export const attributeTransform = (type: MPropOptionsBase['type'], value: string) => {

  if (type.prototype === Boolean.prototype) {
    return value === 'true';
  }
  if(type.prototype === Number.prototype) {
    return Number(value);
  }

  return value;

};
