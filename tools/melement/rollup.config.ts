/**
 * @description rollup config
 * @author 阿怪
 * @date 2022/12/21 10:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import typescript from "@rollup/plugin-typescript";

export default ({
  input: 'index.ts',
  plugins: [typescript()],
  output: [{
    sourcemap: true,
    file: 'dist/index.mjs',
    format: 'esm',
  },{
    sourcemap: true,
    file: 'dist/index.cjs',
    format: 'cjs',
  }],
  external: ['typescript'],
});
