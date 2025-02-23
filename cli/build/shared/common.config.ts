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
import { normalizePath, type UserConfig } from 'vite';

export const getCommonConfig = (pkg = 'lib', pkgName = 'shuimo-ui') => {
  const outputRoot = normalizePath(path.resolve(__dirname, `../../../${pkg}/dist`));
  const baseRoot = normalizePath(path.resolve(__dirname, `../../../${pkg}`));
  const getPath = (url: string) => {
    const p = path.resolve(__dirname, `../../../${pkg}/${url}`);
    return p;
  };

  const plugins: UserConfig['plugins'] = [
    lightningcss({ browserslist: '>= 0.25%' }),
    vue(),
    vueJSX(),
  ];

  const rollupOptions: UserConfig['build']['rollupOptions'] = {
    external: ['vue'],
  };

  const buildConfig: UserConfig['build'] = {
    outDir: outputRoot,
    target: 'esnext',
    rollupOptions,
    terserOptions: {
      mangle: false,
    },
  };

  const libName = pkgName;

  const fileName = (format: string, entryName: string) => {
    if (entryName === 'index') {
      entryName = pkgName;
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

  const commonConfig: UserConfig = {
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

  return {
    plugins,
    buildConfig,
    fileName,
    getPath,
    commonConfig,
    baseRoot,
  };
};
