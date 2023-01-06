/**
 * @description shuimo extend plugin
 * @author 阿怪
 * @date 2023/1/5 17:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * only support extends root class
 */

import { PluginCreator, AtRule, Rule } from 'postcss';

const selectorToList = (selector: string) => {
  return selector.split(',').map((item) => item.trim());
};

export const postcssExtend: PluginCreator<{}> = () => {
  return {
    postcssPlugin: 'shuimo:extend',
    Once(styles) {
      const nodes = styles.nodes.filter(node => node.type === 'rule') as Rule[];
      styles.walkAtRules('extend', (atRule) => {
        const selectors = selectorToList(atRule.params);
        const parent = atRule.parent;

        const needExtendNodes = nodes.filter(node => {
          const nodeSelectors = selectorToList(node.selector);
          return selectors.some(selector => nodeSelectors.includes(selector));
        });
        if (parent) {
          needExtendNodes.forEach(node => {
            parent.insertBefore(atRule, node.clone().nodes);
          });
        }
        atRule.remove();
      });
    }
  };
};

postcssExtend.postcss = true;
