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
const cpLibBase = (lib: 'vue' | 'react' | 'lit' | 'core') => {
  return async (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
    // before cp, rm
    const fromName = `../../packages/${lib}/${path}${name}`;
    const toName = `./config/output/${name}`;
    const options = type === 'document' ? { recursive: true, force: true } : undefined;
    await rm(toName, options);
    return pCp(fromName, toName, options);
  };
};

const init = (lib: 'vue' | 'react' | 'lit') => {
  const cp = async (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
    return pCp(`../../${path}${name}`, `./config/output/${name}`, type === 'document' ? { recursive: true } : undefined);
  };

  const rmLib = (path: string, options?: RmOptions) => {
    return rm(`../../packages/${lib}/${path}`, options ?? { recursive: true, force: true });
  };

  const cpLib = cpLibBase(lib);

  const rename = (name: string) => {
    return pRename(`./${name}`, `./config/output/${name}`);
  };


  const renameTypes = async () => {
    await Promise.all([
      pCp(`./config/output/types/shuimo-ui.d.ts`, `./config/output/types/shuimo-ui.d.mts`),
      pCp(`./config/output/types/shuimo-ui.d.ts`, `./config/output/types/shuimo-ui.d.cts`)
    ]);
    return rm(`./config/output/types/shuimo-ui.d.ts`);
  };

  return { cp, cpLib, rename, rmLib, renameTypes };

};

const run = async () => {

  const { cp, rename, cpLib, rmLib, renameTypes } = init('vue');

  const removeRes = await rmLib('dist');
  const buildRes = await execSync('vite build -c ./config/vue.config.ts');
  const apiRes = await execSync('jh-api -c ./config/janghood.config.ts');


  if (buildRes && apiRes) {


    const res = await Promise.all([
      rename('web-types.json'),
      cp('icons', 'assets/'),
      cp('README.md'),
      cp('LICENSE'),

      cpLibBase('core')('public'),
      cpLib('lib'),
      cpLib('types'),
      cpLib('dist'),
      cpLib('index.ts'),
      cpLib('package.json', '', 'file')
    ]);

    await renameTypes();


    // todo remove "@shuimo-design/types": "workspace:*"

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
