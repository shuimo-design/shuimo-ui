/**
 * @description createElement decorator
 * @author 阿怪
 * @date 2022/12/10 15:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../elements/ShuimoElement';
import { CustomElementParams } from '@shuimo-design/core/types';
import customElementClass from './dependence/customElementClass';


export const customElement = (params: CustomElementParams) => {
  const { name } = params;
  return (target: typeof ShuimoElement) => {
    const CustomShuimoElement = customElementClass(target, params);
    if (customElements.get(name)) {return;}
    customElements.define(name, CustomShuimoElement);
  };
};
