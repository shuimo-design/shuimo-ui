/**
 * @description
 * @author 阿怪
 * @date 2022/12/16 14:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import postcssNested from 'postcss-nested';
import { postcssEach } from './plugins/each';
import { postcssHost } from './plugins/host';
import { postcssExtend } from './plugins/extend';

export const MPostcss = [
  postcssNested(),
  postcssEach(),
  postcssExtend(),
  postcssHost(),
  require('postcss-url')({ url: 'inline' })
];
