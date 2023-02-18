/**
 * @description shuimo postcss annotate plugin
 * @author 阿怪
 * @date 2023/2/18 16:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Syntax, parse, stringify } from 'postcss';


export const postcssAnnotate: Syntax = {
  parse: (css, opts) => {
    const newCss = css.toString().replace(/\/\/[^\n]*\n/g,'');
    return parse(newCss, opts);
  },
  stringify: (node, builder) => {
    return stringify(node, builder);
  }
};
