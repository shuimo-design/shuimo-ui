/**
 * @description es module global style config
 * @author 阿怪
 * @date 2024/2/5 17:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineConfig } from 'vite';
import { buildConfig, getPath, plugins as basePlugins } from './common.config';
import path from 'path';
import fs from 'fs';

export const globalStyleConfig = defineConfig({
  plugins: basePlugins,
  build: {
    ...buildConfig,
    cssCodeSplit: true,
    lib: {
      formats: ['es'],
      /* fileName not work */
      // fileName: (format, entryName) => {
      //   return 'es/global.css';
      // },
      entry: getPath('./assets/style/global.css'),
    },
  },
});


export const moveGlobalToEs = () => {
  const libDistDir = path.resolve('../../lib/dist');
  const esDir = path.resolve(libDistDir, 'es/assets/style');
  const esDirExists = fs.existsSync(esDir);
  if (!esDirExists) {
    fs.mkdirSync(esDir, { recursive: true });
  }
  fs.renameSync(path.resolve(libDistDir, 'global.css'), path.resolve(esDir, 'global.css'));
};
