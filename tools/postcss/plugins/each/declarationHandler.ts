/**
 * @description declaration handler
 * @author 阿怪
 * @date 2022/12/16 01:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Declaration } from 'postcss';

export const declarationHandler = (declaration: Declaration, key: string, replaceKey: string) => {
  // replace value has #{$replaceKey}
  const replaceReg = /#\{\$(.*?)\}/g;
  declaration.value = declaration.value.replaceAll(replaceReg, key);
  return declaration;
};
