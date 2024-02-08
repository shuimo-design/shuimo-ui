/**
 * @description vue build script
 * @author 阿怪
 * @date 2023/6/9 11:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { exec } from 'child_process';
import * as fs from 'fs';
import { RmOptions } from 'fs';
import { build } from 'vite';
import { EsConfig } from './es.config';
import { globalStyleConfig, moveGlobalToEs } from './globalStyle.config';
import { commonConfig } from './common.config';
// import { rimrafSync } from 'rimraf';


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

const execSync = (cmd: string) => {
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
    const toName = `./config/output/${name}`;
    const options = type === 'document' ? { recursive: true, force: true } : undefined;
    await rm(toName, options);
    return pCp(fromName, toName, options);
  };
};

const init = () => {
  const cp = async (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
    return pCp(`../../${path}${name}`, `./config/output/${name}`, type === 'document' ? { recursive: true } : undefined);
  };

  const rmLib = (path: string, options?: RmOptions) => {
    return rm(`../../lib/${path}`, options ?? { recursive: true, force: true });
  };

  const cpLib = cpLibBase('lib');

  const rename = (name: string) => {
    return pRename(`./${name}`, `./config/output/${name}`);
  };


  const renameTypes = async () => {
    await Promise.all([
      pCp(`./config/output/types/shuimo-ui.d.ts`, `./config/output/types/shuimo-ui.d.mts`),
      pCp(`./config/output/types/shuimo-ui.d.ts`, `./config/output/types/shuimo-ui.d.cts`),
    ]);
    return rm(`./config/output/types/shuimo-ui.d.ts`);
  };

  return { cp, cpLib, rename, rmLib, renameTypes };

};

const run = async () => {

  const { cp, rename, cpLib, rmLib, renameTypes } = init();

  const removeRes = await rmLib('dist');
  const esConfig = new EsConfig();
  const commonBuildRes = await build(commonConfig);
  const esmBuildRes = await build(esConfig.config);
  const esmGlobalCssBuildRes = await build(globalStyleConfig);

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

  const apiRes = await execSync('jh-api -c ./config/janghood.config.ts');


  if (commonBuildRes && esmBuildRes && apiRes && esmGlobalCssBuildRes) {

    moveGlobalToEs();

    const res = await Promise.all([
      rename('web-types.json'),
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
    ]);

    await renameTypes();

    // if (res.every(r => r)) {
    //   console.log('build success');
    //   // todo auto publish
    //
    //   rimrafSync('./config/output', {
    //     filter: (path) => {
    //       return !path.includes('web-types.json');
    //     }
    //   });
    // }
  }

};

run();
