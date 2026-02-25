/**
 * @description headless 组件 browser mode 测试配置
 * @author 阿怪
 * @date 2026/2/25 12:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [Vue(), Jsx()],
  root: __dirname,
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    include: ['components/**/__tests__/*.browser.{ts,tsx}'],
  },
});
