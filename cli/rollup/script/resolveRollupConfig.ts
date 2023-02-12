/**
 * @description resolve rollup config
 * @author 阿怪
 * @date 2023/1/12 13:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { pathToFileURL } from 'url';
import { RequiredShuimoBuildConfig, ShuimoBuildConfig } from '../index';
import fs from 'fs';
import path from 'path';
import { RollupOptions } from 'rollup';
import { importAbs, __dirname } from '../common/common';
import rollupResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { rollupPostcss, shuimoRollupPostcssConfig } from '../common/rollup.postcss';

const pathJoin = (args: Array<string | undefined>) => args.filter(e => e !== undefined).join(path.sep);
const getFilterRoot = (val: string | boolean) => {
  if (val === false) {return undefined;}
  if (val === true) {return path.resolve(__dirname, '../../..');}
  return val;
};

const mergeConfig = (config: RequiredShuimoBuildConfig, userConfig: ShuimoBuildConfig) => {
  if (userConfig.plugins) {
    const { plugins } = userConfig;
    if (plugins.resolve !== undefined) {config.plugins.resolve = plugins.resolve;}
    if (plugins.commonjs !== undefined) {config.plugins.commonjs = plugins.commonjs;}
    if (plugins.postcss !== undefined) {config.plugins.postcss = plugins.postcss;}
    if (plugins.typescript !== undefined) {
      const { typescript: tsConfig } = plugins;
      if (tsConfig.filterRoot !== undefined) {config.plugins.typescript.filterRoot = tsConfig.filterRoot;}
      if (tsConfig.tsconfig !== undefined) {config.plugins.typescript.tsconfig = tsConfig.tsconfig;}
      if (tsConfig.include !== undefined) {config.plugins.typescript.include = tsConfig.include;}
      if (tsConfig.exclude !== undefined) {config.plugins.typescript.exclude = tsConfig.exclude;}
    }
  }
  return config;
};

export const resolveRollupConfig = async (pkgDir: string, target: string) => {

  let config: RequiredShuimoBuildConfig = {
    plugins: {
      resolve: false, commonjs: false, postcss: false,
      typescript: { filterRoot: false, tsconfig: false, include: [], exclude: [] }
    },
    external: []
  };

  const url = path.resolve(pathJoin(['.', 'config', target, 'shuimo.build.config.ts']));
  if (fs.existsSync(url)) {
    let { config: userConfig } = await importAbs(url) as { config: ShuimoBuildConfig };
    config = mergeConfig(config, userConfig);
  }
  const { resolve, commonjs: c, postcss: p, typescript: t } = config.plugins!;
  const { filterRoot, tsconfig } = config.plugins?.typescript!;
  const rollupConfig: RollupOptions = {
    plugins: [
      resolve ? rollupResolve() : undefined,
      c ? commonjs() : undefined,
      p ? rollupPostcss(await shuimoRollupPostcssConfig()) : undefined,
      typescript({
        filterRoot: getFilterRoot(filterRoot!),
        tsconfig: tsconfig !== false ? pathJoin([
          tsconfig === true ? pkgDir : tsconfig, './tsconfig.json'
        ]) : '../../tsconfig.json',
        exclude: ['**/vue/**', '**/react/**', '**/apps/**']
      })
    ].filter(e => e),
    external: config.external
  };
  return rollupConfig;
};
