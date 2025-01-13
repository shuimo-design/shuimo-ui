export default defineNuxtConfig({
  devtools: { enabled: true },
  extensions: ['.md'],

  modules: [
    './modules/markdown',
    './modules/fontmin',
    '@shuimo-design/shuimo-ui-nuxt',
    '@nuxtjs/i18n',
    'nuxt-gtag',
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

  gtag: {
    id: 'G-W1HW9D136H',
  },

  compatibilityDate: '2025-01-13',
});