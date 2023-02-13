/**
 * @description
 * @author 阿怪
 * @date 2023/1/7 02:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import typescript from '@rollup/plugin-typescript';
import * as url from 'url';
import { pathToFileURL } from 'url';

export const commonConfig = {
  plugins: [typescript()]
};

export const resolvePath = (path: string) => {
  return path;
}
/**
 * @see  {@link https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/ __dirname}
 * @returns same `import.meta.url`
 */
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * @see  {@link https://github.com/nodejs/node/issues/31710 url}
 * @param targetPath 
 * @returns `file:///c:/x/y/z`
 */
export const importAbs = async (targetPath: string) => {
  const fileUrl = pathToFileURL(targetPath).href;
  return await import(fileUrl);
}
