/**
 * this is a template build file.
 */

import { OutputOptions, rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollupPostcss } from '../common/rollup.postcss';
import commonjs from '@rollup/plugin-commonjs';
import * as path from 'path';
import * as console from 'console';
import * as fs from 'fs';
import postcss from 'postcss';

const run = async () => {
  const input = path.resolve(__dirname, '../../packages/web-component/index.ts');
  const filterRoot = path.resolve(__dirname, '../..');
  const postcssPlugin = await import(path.resolve(__dirname, '../../tools/postcss/index.ts'));

  try {
    const bundle = await rollup({
      input,
      plugins: [
        nodeResolve(),
        commonjs(),
        rollupPostcss({
          include: ['**/*.pcss'],
          transform: async (code: string, id: string) => {
            // 根据id获取文件夹地址
            const dir = path.dirname(id);
            const result = await postcss(postcssPlugin.defineMPostcss({
              import: {
                root: dir,
                resolve: (resolveId: string, basedir: string, importOptions: any) => {
                  return [importOptions.root, resolveId].join(path.sep);
                },
                load: async (filename: string, importOptions: any) => {

                  const str = fs.readFileSync(filename, { encoding: 'utf-8' });
                  const resourceDir = path.dirname(filename);
                  // maybe not support some url grammar
                  const reg = /url\((.+?)\)/g;

                  // 比较dir 和 resourceDir的相对路径
                  const relativePath = path.relative(dir, resourceDir);


                  return str.replace(reg, (match, p1) => {
                    if (match) {
                      if (p1.startsWith('.')) {
                        return `url(${[relativePath, p1].join(path.sep)})`;
                      }
                    }
                    return match;
                  });
                }
              },
              url: { basePath: dir }
            }))
              .process(code, {
                from: dir
              });
            return result.css.toString();
          }
        }),
        typescript({
          filterRoot,
          exclude: ['**/vue/**', '**/react/**', '**/apps/**']
        })
      ],

      onwarn: (warning, warn) => {
        console.log(warning);
      }
    });


    if (bundle) {
      const outputOptionList: OutputOptions[] = [{
        sourcemap: true,
        file: path.resolve(__dirname, '../../packages/web-component/dist/index.mjs'),
        format: 'esm'
      }];

      for (const option of outputOptionList) {
        await bundle.write(option);
      }
      await bundle.close();
      console.log('%c build success', 'color:#861717');
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

run();
