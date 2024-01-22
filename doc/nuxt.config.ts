// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  extensions: ['.md'],
  modules: ['./modules/markdown', './modules/fontmin'],
  alias: {
    '../core': path.resolve('../../packages/core')
  },
});
