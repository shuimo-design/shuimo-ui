/**
 * @description common build config
 * @author 阿怪
 * @date 2024/2/5 01:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import path from 'path';
import lightningcss from 'vite-plugin-lightningcss';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import { type UserConfig, normalizePath } from 'vite';

// windows sep error?
export const outputRoot = normalizePath(path.resolve(__dirname, '../../../lib/dist'));
export const baseRoot = normalizePath(path.resolve(__dirname, '../../../lib'));
export const getPath = (url: string) => {
  const p = path.resolve(__dirname, `../../../lib/${url}`);
  return p;
};

export const plugins: UserConfig['plugins'] = [
  lightningcss({ browserslist: '>= 0.25%' }),
  vue(),
  vueJSX(),
];

export const rollupOptions: UserConfig['build']['rollupOptions'] = {
  external: ['vue'],
};

export const buildConfig: UserConfig['build'] = {
  outDir: outputRoot,
  target: 'esnext',
  rollupOptions,
  terserOptions: {
    mangle: false
  },
};

export const libName = 'shuimo-ui';

export const fileName = (format: string, entryName: string) => {
  if (entryName === 'index') {
    entryName = 'shuimo-ui';
  }
  switch (format) {
    case 'es':
      return `${entryName}.mjs`;
    case 'cjs':
      return `cjs/${entryName}.cjs`;
    case 'umd':
      return `umd/${entryName}.js`;
  }
  return entryName;
};

export const commonConfig: UserConfig = {
  plugins,
  build: {
    ...buildConfig,
    lib: {
      name: libName,
      formats: ['cjs', 'umd'],
      fileName,
      entry: getPath('index.ts'),
    },
  },
};
