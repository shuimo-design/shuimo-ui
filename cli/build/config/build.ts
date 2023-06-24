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

const execSync = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, res => {
      if (res) {
        console.error(res);
        reject(false);
      }
      resolve(true);
    });
  });
};

const run = async () => {
  const buildRes = await execSync('vite build -c ./config/vue.config.ts');
  const apiRes = await execSync('jh-api -c ./config/janghood.config.ts');

  const init = (lib: 'vue' | 'react' | 'lit') => {
    const cp = async (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
      return pCp(`../../${path}${name}`, `./config/output/${name}`, type === 'document' ? { recursive: true } : undefined);
    };

    const cpLib = (name: string, path: string = '', type: 'file' | 'document' = 'document') => {
      return pCp(`../../packages/${lib}/${path}${name}`, `./config/output/${name}`, type === 'document' ? { recursive: true } : undefined);
    };

    const rename = (name: string) => {
      return pRename(`./${name}`, `./config/output/${name}`);
    };

    return { cp, cpLib, rename };

  };

  if (buildRes && apiRes) {

    const { cp, rename, cpLib } = init('vue');

    const res = await Promise.all([
      rename('web-types.json'),
      cp('icons', 'assets/'),
      cp('README.md'),
      cp('LICENSE'),

      cpLib('lib'),
      cpLib('types'),
      cpLib('dist'),
      cpLib('package.json', '', 'file')
    ]);


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
