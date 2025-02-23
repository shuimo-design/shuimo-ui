/**
 * @description es module global style config
 * @author 阿怪
 * @date 2024/2/5 17:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { getCommonConfig } from './common.config';

export const getGlobalStyleConfig = (pkg='lib')=>{
  const {plugins:basePlugins,buildConfig,getPath} = getCommonConfig(pkg);
  return defineConfig({
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
}


export const moveGlobalToEs = (pkg='lib') => {
  const libDistDir = path.resolve(`../../${pkg}/dist`);
  const esDir = path.resolve(libDistDir, 'es/assets/style');
  const esDirExists = fs.existsSync(esDir);
  if (!esDirExists) {
    fs.mkdirSync(esDir, { recursive: true });
  }
  fs.renameSync(path.resolve(libDistDir, 'global.css'), path.resolve(esDir, 'global.css'));
};
