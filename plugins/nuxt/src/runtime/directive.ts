// @ts-nocheck
/**
 * @description shuimo-ui nuxt directive plugin
 * @author 阿怪
 * @date 2024/2/26 17:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo fix ts error
 */
import { defineNuxtPlugin } from '#app';
import { loadingDirective } from 'shuimo-ui';

export default defineNuxtPlugin(async nuxtApp => {
  nuxtApp.vueApp.directive('loading', loadingDirective);
});
