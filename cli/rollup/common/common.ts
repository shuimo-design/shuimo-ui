/**
 * @description
 * @author 阿怪
 * @date 2023/1/7 02:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import typescript from '@rollup/plugin-typescript';

export const commonConfig = {
  plugins: [typescript()]
};

export const resolvePath = (path: string) => {
  return path;
}
