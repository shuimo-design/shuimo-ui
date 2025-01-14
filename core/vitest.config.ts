/**
 * @description
 * @author 阿怪
 * @date 2023/4/28 11:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [Vue(), Jsx()],
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['components/**', 'compositions/**'],
    },
  },
});
