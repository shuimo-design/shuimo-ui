/**
 * @description to build package
 * @author 阿怪
 * @date 2023/1/7 04:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import * as path from 'path';
import { OutputOptions, rollup } from 'rollup';
import { resolvePackage } from './resolvePackage';
import console from 'console';
import { resolveRollupConfig } from './resolveRollupConfig';
import fs from 'fs';
import { importAbs } from 'common/common';

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
if (!target) {console.warn('you should provide target');}

const pkgDir = path.resolve(pathJoin(['../../', target]));
const packagePath = pathJoin([pkgDir, 'package.json']);

const packageJson = await importAbs(packagePath);

const run = async () => {
  let bundle;
  let buildField = false;
  const pkgOption = resolvePackage(pkgDir, packageJson);
  const rollupConfig = await resolveRollupConfig(pkgDir, target!);
  if (!pkgOption.output) {return;}
  try {
    bundle = await rollup({
      input: pathJoin([pkgDir, pkgOption.input as string]),
      ...rollupConfig,
      onwarn: (warning, warn) => {
        // todo
        warn(warning);
      }
    });

  } catch (e: any) {
    console.error(e);
    buildField = true;
  }


  if (bundle) {
    const outputOptionList: OutputOptions[] = Array.isArray(pkgOption.output) ? pkgOption.output : [pkgOption.output];
    for (const option of outputOptionList) {
      if (option.file && fs.existsSync(option.file)) {
        fs.unlinkSync(option.file);
      }
      await bundle.write(option);
    }
    await bundle.close();
    console.log('%c build success', 'color:#4A9992');
  }

  process.exit(buildField ? 1 : 0);
};
run();
