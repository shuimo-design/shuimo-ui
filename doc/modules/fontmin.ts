/**
 * @description nuxt fontmin module
 * @author 阿怪
 * @date 2022/5/6 10:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineNuxtModule } from "@nuxt/kit";
import { fileScanAndFontmin } from '@higuaifan/rollup-plugin-fontmin';

export default defineNuxtModule({
  async setup(options, nuxt) {
    nuxt.hook('close', async () => {
      await fileScanAndFontmin({
        fontSrc: './.output/public/fonts/*.*',
        fontDest: './.output/public/fonts',
        include: [
          'pages/**/*',
          'components/**/*',
          'config/menu.config.ts',
          'demos/**/*',
          'apis/**/*',
        ],
      });
    });
  }

})
