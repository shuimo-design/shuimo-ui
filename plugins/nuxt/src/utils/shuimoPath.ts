/**
 * @description resolve shuimo-ui path
 * @author 阿怪
 * @date 2024/2/26 11:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import path from 'path';


const pkgName = 'shuimo-ui';
const shuimoEntryPath = require.resolve(pkgName);
const shuimoEntryDir = path.parse(shuimoEntryPath).dir;
export const SHUIMO_ROOT_PATH = path.resolve(`${shuimoEntryDir}/../../`);
