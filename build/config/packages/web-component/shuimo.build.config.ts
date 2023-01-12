/**
 * @description web-component build config
 * @author 阿怪
 * @date 2023/1/11 18:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ShuimoBuildConfig } from '../../../index';


export const config: ShuimoBuildConfig = {
  plugins: {
    resolve: true,
    commonjs: true,
    postcss: true,
    typescript: {
      filterRoot: true,
      exclude: ['**/vue/**', '**/react/**', '**/apps/**']
    }
  }
};


