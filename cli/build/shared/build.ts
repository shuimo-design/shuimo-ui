/**
 * @description common build
 * @author 阿怪
 * @date 2025/2/23 22:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import fs, { RmOptions } from 'fs';
import { exec } from 'child_process';
import { getEsConfig } from './es.config';
import { build } from 'vite';
import { getCommonConfig } from './common.config';
import { getGlobalStyleConfig, moveGlobalToEs } from './globalStyle.config';
import path from 'path';


const promisify = (fn: Function) => {
  return (...args: any[]) => {
    return new Promise<boolean>((resolve, reject) => {
      fn(...args, err => {
        if (err) {
          console.error(err);
          reject(false);
        }
        resolve(true);
      });
    });
  };
};

const pCp = promisify(fs.cp);
const pRename = promisify(fs.rename);
const pRm = promisify(fs.rm);

export const execSync = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (res, stdout) => {
      if (res) {
        console.error(res);
        reject(false);
      }
      console.log(stdout);
      resolve(true);
    });
  });
};
const rm = (path: string, options?: RmOptions) => {
  return pRm(path, options ?? { recursive: true, force: true });
};
const cpLibBase = (lib: string) => {
  return async (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
    // before cp, rm
    const fromName = `../../${lib}/${path}${name}`;
    const toName = `./${lib}/output/${name}`;
    const options = type === 'document' ? { recursive: true, force: true } : undefined;
    await rm(toName, options);
    return pCp(fromName, toName, options);
  };
};

export const init = (
  pkg = 'lib',
  pkgName = 'shuimo-ui',
) => {
  const cp = async (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
    return pCp(`../../${path}${name}`, `./${pkg}/output/${name}`, type === 'document' ? { recursive: true } : undefined);
  };

  const rmLib = (path: string, options?: RmOptions) => {
    return rm(`../../${pkg}/${path}`, options ?? { recursive: true, force: true });
  };

  const cpLib = cpLibBase(pkg);

  const rename = (name: string) => {
    console.log(path.resolve(`./${name}`));
    return pRename(`./${name}`, `./${pkg}/output/${name}`);
  };


  const renameTypes = async () => {
    await Promise.all([
      pCp(`./${pkg}/output/types/${pkgName}.d.ts`, `./${pkg}/output/types/${pkgName}.d.mts`),
      pCp(`./${pkg}/output/types/${pkgName}.d.ts`, `./${pkg}/output/types/${pkgName}.d.cts`),
    ]);
    return rm(`./${pkg}/output/types/${pkgName}.d.ts`);
  };

  return { cp, cpLib, rename, rmLib, renameTypes };

};


export const run = async (
  pkg = 'lib',
  pkgName = 'shuimo-ui',
  fileTask?: (
    rename: (name: string) => Promise<boolean>,
    cp: (name: string, path: string, type: 'file' | 'document') => Promise<boolean>,
    cpLib: (lib: string) => Promise<boolean>
  ) => Promise<boolean>[]
) => {

  const { cp, rename, cpLib, rmLib, renameTypes } = init(pkg, pkgName);

  const removeRes = await rmLib('dist');
  const EsConfig = getEsConfig(pkg, pkgName);
  const esConfig = new EsConfig();
  const commonBuildRes = await build(getCommonConfig(pkg, pkgName).commonConfig);
  const esmBuildRes = await build(esConfig.config);
  const esmGlobalCssBuildRes = await build(getGlobalStyleConfig(pkg));

  // 遍历esConfig.savedCssObj
  for (const key in esConfig.savedCssObj) {
    const value = esConfig.savedCssObj[key];
    const res = fs.existsSync(key);
    // 在头部插入 import '${value}.css';
    if (res) {
      const data = fs.readFileSync(key, 'utf-8');
      fs.writeFileSync(key, `import './${value}.css';\n${data}`);
    }
  }

  const apiRes = await execSync(`jh-api -c ./${pkg}/janghood.config.ts`);


  if (commonBuildRes && esmBuildRes && apiRes && esmGlobalCssBuildRes) {

    moveGlobalToEs(pkg);

    const res = await Promise.all([
      rename('web-types.json'),
      rename('tags.json'),
      rename('attributes.json'),
      cp('icons', 'assets/'),
      cp('README.md'),
      cp('LICENSE'),

      cpLib('public'),
      cpLib('components'),
      cpLib('compositions'),
      cpLib('types'),
      cpLib('dist'),
      cpLib('index.ts'),
      cpLib('assets/style'),
      cpLib('package.json', '', 'file'),
      ...(fileTask ? fileTask(rename, cp, cpLib) : [])
    ]);

    await renameTypes();

    // if (res.every(r => r)) {
    //   console.log('build success');
    //   // todo auto publish
    //
    //   rimrafSync(`./${lib}/output`, {
    //     filter: (path) => {
    //       return !path.includes('web-types.json');
    //     }
    //   });
    // }
  }

};
