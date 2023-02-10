/**
 * @description
 * @author 阿怪
 * @date 2023/2/9 17:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vitest/config';
import { Plugin } from 'vite';
import { MODE_TYPE } from './enums';
import * as esbuild from 'esbuild';

// quite sloppy
const shuimoCoreTsx = (MODE?: string):Plugin => {
  const jsxFactory = MODE === MODE_TYPE.WEB_COMPONENT ? 'mWC' : 'm';
  return {
    name: 'shuimo:core-tsx',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (id.endsWith('.tsx')) {
        const result = await esbuild.transform(
          `import { ${jsxFactory}} from '../../lib/wcJSX';${code}`,
          {
            jsxFactory,
            loader: 'tsx'
          });
        code = result.code;
      }

      return { code, id };
    }
  };
};


export default defineConfig({
  plugins: [shuimoCoreTsx(MODE_TYPE.WEB_COMPONENT)],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    environment: 'jsdom',
    clearMocks: true,
    coverage: {
      all: true,
      include: ['lib/**'],
      exclude: ['lib/index.ts', 'lib/**/*.d.ts'],
      reporter: ['json', 'html']
    }
  }
});
