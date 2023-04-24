/**
 * @description
 * @author 阿怪
 * @date 2023/4/19 23:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Plugin } from 'vite';
import * as esbuild from 'esbuild';

export function reactTsx(): Plugin {
  return {
    name: 'shuimo:react-tsx',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (id.includes('.tsx') && id.includes('react')) {
        const res = await esbuild.transform(
          `import { createElement } from 'react';${code}`,
          {
            jsxFactory:'createElement',
            loader: 'tsx'
          });
        code = res.code;
      }
      return { code, id };
    }
  };

}
