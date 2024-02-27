// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  extensions: ['.md'],
  modules: [
    './modules/markdown',
    './modules/fontmin',
    '@shuimo-design/shuimo-ui-nuxt',
  ],
  css: ['./assets/style/index.css'],
  alias: {
    '../core': path.resolve('../../packages/core'),
  },
});
