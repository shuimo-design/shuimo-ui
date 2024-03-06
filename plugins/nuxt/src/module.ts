/**
 * @description shuimo nuxt module
 * @author 阿怪
 * @date 2024/2/26 15:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { addComponent, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { SHUIMO_ROOT_PATH } from './utils/shuimoPath';
import { readdirSync } from 'node:fs';

// Module options TypeScript interface definition
export interface ShuimoNuxtModuleOptions {
}

const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule<ShuimoNuxtModuleOptions>({
  meta: {
    name: 'shuimo-ui',
    configKey: 'shuimoUIModule',
  },
  defaults: {},
  hooks: {
    'components:dirs': async (dirs) => {
      // todo: use addComponent ?

      const typeDirentList = readdirSync(`${SHUIMO_ROOT_PATH}/dist/es/components`, { withFileTypes: true });
      typeDirentList.forEach(d => {
        const dir = d.name;
        if (d.isDirectory()) {
          const nameDirentList = readdirSync(`${SHUIMO_ROOT_PATH}/dist/es/components/${dir}`, { withFileTypes: true });
          nameDirentList.forEach(n => {
            if (n.isDirectory()) {
              dirs.push({
                path: resolve(`${SHUIMO_ROOT_PATH}/dist/es/components/${dir}/${n.name}`),
                prefix: 'M',
              });
            }
          });
        }
      });


    },
  },
  async setup(options, nuxt) {
    nuxt.hook('nitro:config', async nitroConfig => {
      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        dir: resolve(`${SHUIMO_ROOT_PATH}/public`),
        baseURL: 'm-shuimo',
        maxAge: 60 * 60 * 24 * 30,
      });
    });
    nuxt.options.build.transpile ||= [];
    nuxt.options.build.transpile.push('shuimo-ui');

    nuxt.options.css.push(resolve(`${SHUIMO_ROOT_PATH}/dist/es/assets/style/global.css`));

    addPlugin(resolve('./runtime/directive'));
    addPlugin(resolve('./runtime/provide'));

    await addComponent({
      name: 'MLoadingPreview',
      export: 'default',
      filePath: resolve('runtime/components/MLoadingPreview.vue'),
    });

  },
});
