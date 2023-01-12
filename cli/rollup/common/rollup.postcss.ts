/**
 * @description rollup postcss functions
 * @author 阿怪
 * @date 2023/1/11 01:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'rollup';
import path from 'path';
import postcss from 'postcss';
import fs from 'fs';

export const rollupPostcss = (opts: {
  transform?: (code: string, id: string) => Promise<string>,
  include?: string[],
  exclude?: string[]
}): Plugin => {
  if (!opts.include) {
    throw Error('include option should be specified');
  }

  const filter = createFilter(opts.include, opts.exclude);

  const transform = opts.transform || ((code: string, id: string) => code);

  return {
    name: 'shuimo:rollup-postcss',
    async transform(code: string, id: string) {
      if (filter(id)) {
        const result = `export default ${JSON.stringify(await transform(code, id))}`;
        return {
          code: result,
          map: { mappings: '' }
        };
      }
    }
  };
};


export const shuimoRollupPostcssConfig = async () => {
  const postcssPlugin = await import(path.resolve(__dirname, '../../../tools/postcss/index.ts'));

  return {
    include: ['**/*.pcss'],
    transform: async (code: string, id: string) => {
      // get folder address based on id
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

            // compare the relative paths of dir and resourceDir
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
  };
};
