/**
 * @description vue install plugin
 * @author 阿怪
 * @date 2024/2/5 14:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MUIOption } from '../../types/shuimo-ui';
import { install } from './index.ts';


export function createMUI(options: MUIOption | undefined = {}) {
  return {
    install: install(options),
  };
}
