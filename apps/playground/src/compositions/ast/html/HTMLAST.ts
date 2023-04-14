/**
 * @description HTML AST
 * @author 阿怪
 * @date 2023/4/13 21:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import HTMLWalker from './HTMLWalker';
import { getDom } from './getDom';

export const parse = (code: string) => {
  const walker = new HTMLWalker(`<div>${code}</div>`);
  const ast = getDom(walker);
  return ast.children ?? [];
};
