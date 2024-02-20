/**
 * @description
 * @author 阿怪
 * @date 2024/1/9 23:14
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { addComponent, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  setup(options, nuxtApp) {

    const { resolve } = createResolver(import.meta.url);
    nuxtApp.hook('nitro:config', async nitroConfig => {
      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        // dir: resolve('../../node_modules/shuimo-ui/public'),
        dir: resolve('../../../lib/public/icon'),
        baseURL: 'm-shuimo',
        maxAge: 60 * 60 * 24 * 30,
      });
    });
    addPlugin(resolve('./plugin.ts'));

    addComponent({
      name: 'MLoadingPreview',
      filePath: resolve('./components/MLoadingPreview.vue'),
    });

    // nuxtApp.options.css.push(resolve('../../node_modules/shuimo-ui/dist/style.css'));
  },
});
