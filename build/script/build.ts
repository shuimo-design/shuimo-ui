/**
 * @description
 * @author 阿怪
 * @date 2023/1/7 04:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import * as path from 'path';
import { OutputOptions, rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import rollupResolve from '@rollup/plugin-node-resolve';
import { resolvePackage } from './resolvePackage';

const pathJoin = (args: Array<string | undefined>) => args.filter(e => e !== undefined).join(path.sep);

const getTarget = () => {
  const argv = process.argv;
  let target, hasTarget = false;
  for (const a of argv) {
    if (hasTarget) {
      target = a;
      break;
    }
    if (a === '--target') {
      hasTarget = true;
    }
  }
  return target;
};

const target = getTarget();
if (!target) {
  console.warn('you should provide target');
}

const pkgDir = path.resolve(pathJoin(['.', target]));
const packageJson = require(pathJoin([pkgDir, 'package.json']));


const run = async () => {
  let bundle;
  let buildField = false;
  const pkgOption = resolvePackage(pkgDir, packageJson);
  if (!pkgOption.output) {return;}
  try {
    bundle = await rollup({
      input: pathJoin([pkgDir, pkgOption.input as string]),
      plugins: [
        // rollupResolve(), // todo 不一定需要这个
        typescript({
          // filterRoot: pkgDir,
          filterRoot: './packages',
          tsconfig: pathJoin([pkgDir, 'tsconfig.json'])
        })
      ],
      external: ['moelement'], // todo 参数化
      onwarn: (warning, warn) => {
        // todo
      }
    });

  } catch (e: any) {
    console.error(e);
    buildField = true;
  }

  if (bundle) {
    const outputOptionList: OutputOptions[] = Array.isArray(pkgOption.output) ? pkgOption.output : [pkgOption.output];
    for (const option of outputOptionList) {
      await bundle.write(option);
    }
    await bundle.close();
  }

  process.exit(buildField ? 1 : 0);
};
run();
