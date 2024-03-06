// @ts-nocheck
/**
 * @description shuimo-ui nuxt provide plugin
 * @author 阿怪
 * @date 2024/3/6 10:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo fix ts error
 */
import { defineNuxtPlugin } from '#app';
import { MShuimoConfigKey } from 'shuimo-ui';

export default defineNuxtPlugin(async nuxtApp => {
  nuxtApp.vueApp.provide(MShuimoConfigKey,{ svgInject: 'nuxt' });
});
