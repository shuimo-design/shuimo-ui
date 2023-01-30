/**
 * @description create moelement decorator
 * @author 阿怪
 * @date 2022/12/20 15:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import initCustomerElement from './initCustomerElement';
import { MCreateMelement } from '../../types/template';


export const createMElement = <T>(component: MCreateMelement<T>) => {
  const { name } = component;
  return (target: any) => {
    const CustomMElement = initCustomerElement(target, component);
    if (customElements.get(name)) {return;}
    customElements.define(name, CustomMElement);
  };
};
