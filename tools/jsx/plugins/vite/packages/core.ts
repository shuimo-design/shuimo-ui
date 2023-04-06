/**
 * @description jsx vite plugin core handler
 * @author 阿怪
 * @date 2023/3/29 16:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import fs from 'fs';
import { resolveRealPath } from './tools';


const PKG_LIB = '../../../packages/core/lib';
const REAL_PKG_LIB = resolveRealPath(PKG_LIB);

const getCodeAndTag = (id: string) => {
  const match = id.match(/\?tag=(.*)/);
  if (!match) {return;}
  const tag = match[1];
  id = id.replace(/\?tag=.*/, '');
  let code = fs.readFileSync(id, 'utf-8');

  return { code, tag };
};

const loadIndex = (id: string) => {
  const res = getCodeAndTag(id);
  if (!res) {return;}
  let { code, tag } = res;
  // replace import lib
  return code.replace(`'./lib`, `'${REAL_PKG_LIB}/index.ts?tag=${tag}`);
};


const transformPath = (id: string, tag: string) => {
  const files = id.split('/');
  files[0] = REAL_PKG_LIB;
  return `${files.join('/')}.tsx?tag=${tag}`;
};

const transformPathWithFilter = (id: string, tag: string) => {
  const files = id.split('/').filter((f) => f !== '..');
  files.unshift(REAL_PKG_LIB);
  return `${files.join('/')}.tsx?tag=${tag}`;
};

const loadLib = (id: string) => {
  const res = getCodeAndTag(id);
  if (!res) {return;}
  let { code, tag } = res;

  const matchRes = code.match(/from '([^']*)';/g);
  if (!matchRes) {return;}
  for (let m of matchRes) {

    // magic skip useGlobal
    if (m.includes('useGlobal')) {
      continue;
    }
    m = m.replace(/from '([^']*)';/, '$1');
    code = code.replace(m, `${transformPath(m, tag)}`);
  }
  return code;
};

const loadHook = (id: string) => {
  const res = getCodeAndTag(id);
  if (!res) {return;}
  let { code, tag } = res;
  const matchRes = code.match(/import { use[^}]*} from '([^']*)';/g);
  if (!matchRes) {return;}
  for (let m of matchRes) {
    m = m.replace(/import { use[^}]*} from '([^']*)';/, '$1');
    code = code.replace(m, `${transformPathWithFilter(m, tag)}`);
  }
  return code;
};


export default {
  loadIndex,
  loadLib,
  loadHook
};
