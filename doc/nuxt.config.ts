// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  extensions: ['.md'],
  modules: [
    './modules/markdown',
    './modules/fontmin',
    '@shuimo-design/shuimo-ui-nuxt',
    '@nuxtjs/i18n',
  ],
  css: ['./assets/style/index.css'],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
      },
    ],
    pages: {
      'm-shuimo': false,
    },
    vueI18n: './i18n/i18n.config.ts',
  },
});
