/**
 * @description A rough css each in postcss plugin
 * @author 阿怪
 * @date 2022/12/16 01:14
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { PluginCreator, AtRule } from 'postcss';
import { nodesHandler } from './nodesHandler';

type EachOptions = {}

export const postcssEach: PluginCreator<EachOptions> = opts => {
  return {
    postcssPlugin: 'shuimo:each',
    Once(styles, result) {
      styles.walkAtRules('each', (atRule, helper) => {
        const newRule = new AtRule(atRule);


        const [replaceKey, ...splitRight] = newRule.params.split('in');
        const keyStr = splitRight.join('in');
        const keys = keyStr.split(',').map(e => e.trim());

        nodesHandler(newRule.nodes, keys, replaceKey.trim().slice(1));

        if (atRule.parent) {
          atRule.parent.insertBefore(atRule, newRule.nodes);
          atRule.remove();
        }

      });
    }
  };
};

postcssEach.postcss = true;

