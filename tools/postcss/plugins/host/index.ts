/**
 * @description
 * @author 阿怪
 * @date 2022/12/26 07:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { PluginCreator, AtRule } from 'postcss';

export const postcssHost: PluginCreator<{}> = opts => {
  return {
    postcssPlugin: 'shuimo:host',
    Once(styles, result) {
      const { file } = styles.source!.input;
      if (file && file.includes('.pcss')) {
        styles.walkRules((rule, helper) => {
          if (rule.parent && rule.parent.type === 'root') {
            rule.selectors = rule.selectors.map(selector => `:host ${selector}`);
          }
        });
      }
    }
  };
};

postcssHost.postcss = true;
