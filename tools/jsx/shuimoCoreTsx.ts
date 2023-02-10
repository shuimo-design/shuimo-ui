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
import * as esbuild from 'esbuild';
import { MODE_TYPE } from './enums';


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
        const result = await esbuild.transform(
          `import { ${jsxFactory}, shuimoJsxFragment} from '@shuimo-design/jsx/jsxTools';${code}`,
          {
            jsxFactory,
            jsxFragment: 'shuimoJsxFragment',
            loader: 'tsx'
          });
        code = result.code;
      }

      return {
        code, id
      };
    }
  };
}
