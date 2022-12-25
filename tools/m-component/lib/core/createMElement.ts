/**
 * @description create moelement decorator
 * @author 阿怪
 * @date 2022/12/20 15:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MElement from '../MElement';
import initCustomerElement from './initCustomerElement';
import { MElementOptions } from '../../types/template';


export const createMElement = (options: MElementOptions) => {
  const { name } = options;
  return (target: typeof MElement) => {
    const CustomMElement = initCustomerElement(target, options);
    if (customElements.get(name)) {return;}
    customElements.define(name, CustomMElement);
  };
};
