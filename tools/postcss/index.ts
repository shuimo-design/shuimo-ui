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

const hostConfig = {
  includes: ['**/packages/core/**/*.pcss','*.pcss'],
  excludes: ['**/global.pcss']
}

export const MPostcss = [
  postcssNested(),
  postcssEach(),
  require('postcss-import')(),
  require('postcss-url')({ url: 'inline' }),
  postcssExtend(),
  postcssHost(hostConfig),
];


export const defineMPostcss = (opt: {
  plugins?: {
    host: boolean | {};
  },
  import: {
    root: string,
    resolve?: (id: string, basedir: string, importOptions: any) => string,
    load?: (filename: string, importOptions: any) => Promise<string>
  },
  url: { basePath: string, }
}) => {
  const importOption = { ...opt.import };
  const urlOption = { url: 'inline', basePath: opt.url.basePath };
  const hosts = opt.plugins && opt.plugins.host ? [postcssHost(
    typeof opt.plugins.host === 'object' ? opt.plugins.host : hostConfig
  )] : [];
  return [
    postcssNested(),
    postcssEach(),
    require('postcss-import')(importOption),
    require('postcss-url')(urlOption),
    postcssExtend(),
    ...hosts,
  ];
};
