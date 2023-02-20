/**
 * @description vite plugins: call esbuild transform
 * @author 阿怪
 * @date 2023/2/20 15:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 1. add import jsxTools before code
 */
import * as esbuild from 'esbuild';

export const esbuildTransform = async (code: string, jsxFactory: string) => {
  const result = await esbuild.transform(
    `import { ${jsxFactory}, shuimoJsxFragment } from '@shuimo-design/jsx/jsxTools';${code}`,
    {
      jsxFactory,
      jsxFragment: 'shuimoJsxFragment',
      loader: 'tsx'
    });
  return result.code;
};
