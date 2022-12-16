/**
 * @description rule handler
 * @author 阿怪
 * @date 2022/12/16 01:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { Rule, Declaration } from 'postcss';
import { nodesHandler } from './nodesHandler';
import { declarationHandler } from './declarationHandler';

export const ruleReplaceHandler = (rule: Rule, key: string, replaceKey: string) => {

  const { nodes } = rule;
  nodes.forEach(n => {
    if (n.type === 'decl') {
      declarationHandler(n as Declaration, key, replaceKey);
    }
  });

};

export const ruleHandler = (rule: Rule, keys: string[], replaceKey: string) => {
  const { selector, nodes } = rule;
  // first deal with nodes
  // nodesHandler(nodes, keys, replaceKey);

  // then deal with selector, for each key
  const replaceReg = /\$\((.*?)\)/g;
  const matchList = selector.match(replaceReg);
  if (!matchList || matchList.length === 0) {
    return rule;
  }
  const newRules: Rule[] = [];
  matchList.forEach(match => {
    if (match === `$(${replaceKey})`) {
      keys.forEach(k => {
        const newSelector = selector.replace(replaceReg, k);
        const newRule = rule.clone({ selector: newSelector });
        // deal with rule's nodes
        newRule.nodes.forEach(n => {
          if (n.type === 'rule') {
            ruleReplaceHandler(n as Rule, k, replaceKey);
          }
          if (n.type === 'decl') {
            declarationHandler(n as Declaration, k, replaceKey);
          }
        });


        newRules.push(newRule);
      });
    }
  });

  // never mind...some rude code for test.
  rule.replaceWith(...newRules);
};

