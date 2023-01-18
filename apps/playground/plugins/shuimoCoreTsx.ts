/**
 * @description
 * @author 阿怪
 * @date 2023/1/16 13:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import * as esbuild from 'esbuild';


export default function shuimoCoreTsx() {
  return {
    name: 'shuimo:core-tsx',
    enforce: 'pre',
    async transform(code: string, id: string) {


      if (id.endsWith('.tsx') && id.includes('packages/core')) {
        const result = await esbuild.transform(
          `import { mWC, shuimoJsxFragment} from '../../../tools/jsxTools';${code}`,
          {
            jsxFactory: 'mWC',
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
