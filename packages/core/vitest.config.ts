/**
 * @description vitest config
 * @author 阿怪
 * @date 2023/1/24 01:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vitest/config';
import { MODE_TYPE, shuimoCoreTsx } from '@shuimo-design/jsx';

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
