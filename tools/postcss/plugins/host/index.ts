/**
 * @description
 * @author 阿怪
 * @date 2022/12/26 07:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { PluginCreator, AtRule } from 'postcss';
import minimatch from 'minimatch';

export const postcssHost: PluginCreator<{
  includes?: string[];
  excludes?: string[];
}> = opts => {


  return {
    postcssPlugin: 'shuimo:host',
    Once(styles, result) {
      const { file } = styles.source!.input;


      if (file && file.includes('.pcss')) {

        let needSkip = false;

        if (opts) {
          if (opts.includes) {
            needSkip = true;
            for (const include of opts.includes) {
              if (include && minimatch(file, include)) {
                needSkip = false;
                break;
              }
            }
          }
          if (!needSkip && opts.excludes) {
            for (const exclude of opts.excludes) {
              if (exclude && minimatch(file, exclude)) {
                needSkip = true;
                break;
              }
            }
          }
        }
        if (needSkip) {
          return;
        }

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
