/**
 * @description resolve rollup config
 * @author 阿怪
 * @date 2023/1/12 13:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RequiredShuimoBuildConfig, ShuimoBuildConfig } from '../index';
import fs from 'fs';
import path from 'path';
import { RollupOptions } from 'rollup';

import rollupResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { rollupPostcss, shuimoRollupPostcssConfig } from '../common/rollup.postcss';

const pathJoin = (args: Array<string | undefined>) => args.filter(e => e !== undefined).join(path.sep);
const getFilterRoot = (val: string | boolean) => {
  if (val === false) {return undefined;}
  if (val === true) {return path.resolve(__dirname, '../..');}
  return val;
};


export const resolveRollupConfig = async (pkgDir: string, target: string) => {

  let config: RequiredShuimoBuildConfig = {
    plugins: {
      resolve: false, commonjs: false, postcss: false,
      typescript: { filterRoot: false, tsconfig: false, include: [], exclude: [] }
    },
    external: []
  };

  const url = path.resolve(pathJoin(['./build/config', target, 'shuimo.build.config.ts']));

  if (fs.existsSync(url)) {
    let { config: userConfig } = await import(url) as { config: ShuimoBuildConfig };
    config = Object.assign(config, userConfig);
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
          tsconfig === true ? pkgDir : tsconfig,
          'tsconfig.json'
        ]) : undefined,
        include: t.include,
        exclude: t.exclude
      })
    ].filter(e => e),
    external: config.external
  };
  return rollupConfig;
};
