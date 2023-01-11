import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'rollup';

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

