/**
 * @description shuimo core tsx plugin for vite
 * @author 阿怪
 * @date 2023/1/16 13:59
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 simple support includes option
 */
import { type Plugin } from 'vite';
import { MODE_TYPE } from '../../enums';
import { esbuildTransform } from './esbuildTransform';


export function shuimoCoreTsx(
  MODE?: string,
  options?: {
    includes?: string,
  }
): Plugin {
  const jsxFactory = MODE === MODE_TYPE.WEB_COMPONENT ? 'mWC' : 'm';
  return {
    name: 'shuimo:core-tsx',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (id.endsWith('.tsx') && id.includes(options?.includes ?? 'packages/core')) {
        code = await esbuildTransform(code, jsxFactory);
      }

      return { code, id };
    }
  };
}
