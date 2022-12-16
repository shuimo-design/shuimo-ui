/**
 * @description nodes handler
 * @author 阿怪
 * @date 2022/12/16 01:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ChildNode, Rule, Declaration } from 'postcss';
import { ruleHandler } from './ruleHandler';
import { declarationHandler } from './declarationHandler';

export const nodesHandler = (nodes: Array<ChildNode>, keys: string[], replaceKey: string) => {
  nodes.forEach(n => {
    if (n.type === 'rule') {
      ruleHandler(n as Rule, keys, replaceKey);
    }
  });
};
