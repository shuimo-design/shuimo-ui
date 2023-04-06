/**
 * @description jsx vite plugin web-component handler
 * @author 阿怪
 * @date 2023/3/29 09:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import * as fs from 'fs';
import { resolveRealPath } from './tools';

const lodeIndexCode = (id: string) => {
  let code = fs.readFileSync(id, 'utf-8');
  const path = resolveRealPath('../../../packages/web-component/lib');
  code = code.replaceAll('import(\'./lib', `import(\`${path}`)
    .replaceAll('\'),', `.ts?tag=wc-\${prev}\`),`);
  return code;
};


const loadLibCode = (id: string) => {
  id = id.replace(/\?tag=.*/, '');
  let code = fs.readFileSync(id, 'utf8');
  code = code.replaceAll('@shuimo-design/core',resolveRealPath('../../../packages/core/index.ts?tag=wc'));
  return code;
};

export default {
  lodeIndexCode,
  loadLibCode
};
