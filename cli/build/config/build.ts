/**
 * @description vue build script
 * @author 阿怪
 * @date 2023/6/9 11:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { execSync } from 'child_process';
import * as fs from 'fs';

const buildRes = execSync('vite build -c ./config/vue.config.ts');
const apiRes = execSync('jh-api -c ./config/janghood.config.ts');

if (buildRes && apiRes) {

  fs.renameSync('./web-types.json', './config/output/web-types.json');

  // use node copy directory
  fs.cpSync('../../packages/vue/lib', './config/output/lib', { recursive: true });
  fs.cpSync('../../assets/icons', './config/output/icons', { recursive: true });
  fs.cpSync('../../packages/vue/types', './config/output/types', { recursive: true });
  fs.cpSync('../../packages/vue/dist', './config/output/dist', { recursive: true });
  fs.cpSync('../../packages/vue/package.json', './config/output/package.json');
  fs.cpSync('../../README.md', './config/output/README.md');

  // todo remove "@shuimo-design/types": "workspace:*"
  // todo update web-types name and version

  // todo auto publish and remove files
}
