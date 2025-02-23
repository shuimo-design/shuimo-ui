/**
 * @description ui-core build script
 * @author 阿怪
 * @date 2025/2/23 23:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { run } from '../shared/build';

run('core','shuimo-ui-core',(rename, cp, cpLib)=>{
  return [
    cpLib('tools'),
    cpLib('runtime')
  ]
})
