/**
 * @description
 * @author 阿怪
 * @date 2024/1/9 23:14
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { createMUI } from 'shuimo-ui';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createMUI({
    disableWebComponent: ['MBorder', 'MRicePaper'],
    svgInject: 'nuxt'
  }));
});
