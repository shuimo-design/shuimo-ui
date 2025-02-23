/**
 * @description 极客江湖插件配置文件
 * @author 阿怪
 * @date 2022/4/6 4:55 PM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { getJanghoodConfig } from '../shared/getJanghoodConfig';

export default getJanghoodConfig({
  include: ['../../lib/components/**/**/*.d.ts', '../../core/components/**/**/*.d.ts'],
  exclude: ['../../lib/components/types/*.d.ts', '../../core/components/types/*.d.ts'],
  packageUrl: '../../lib/package.json',
});
