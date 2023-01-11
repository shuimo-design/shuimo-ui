/**
 * @description package.json resolve
 * @author 阿怪
 * @date 2023/1/8 04:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RollupOptions } from 'rollup';
import * as path from 'path';

type PackageJSON = Record<string, any>;

const resolveMain = (pkgDir: string, packageJson: PackageJSON): Omit<RollupOptions, 'input'> => {
  const main = packageJson.main;
  if (main) {
    return {
      output: [{ sourcemap: true, file: [pkgDir, main].join(path.sep), format: 'commonjs' }]
    };
  }
  return {};
};

export const resolvePackage = (pkgDir: string, packageJson: PackageJSON) => {
  const main = packageJson.main; // means node type
  const browser = packageJson.browser; //means browser type
  let pkgOptions: RollupOptions = {};

  if (main && browser) {
    console.warn('package.json should not have both main and browser fields');
  }

  if (browser) {
    console.error('not support browser type yet');
  }

  pkgOptions = resolveMain(pkgDir, packageJson);

  return {
    input: 'index.ts',
    ...pkgOptions
  };
};
