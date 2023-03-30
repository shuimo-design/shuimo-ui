/**
 * @description shuimo core tsx plugin for vite
 * @author 阿怪
 * @date 2023/1/16 13:59
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 simple support includes option
 */
import { type Plugin } from 'vite';
import { esbuildTransform } from './esbuildTransform';
import wc from './packages/web-component';
import core from './packages/core';


const load: Plugin['load'] = id => {
  if (!id.includes('shuimo-design/packages')) {return;}
  // 1. handle package index load
  if (id.includes('index.ts')) {
    if (id.includes('packages/web-component')) {
      return wc.lodeIndexCode(id);
    }
  }
  // 2. handle lib file load
  if (id.includes('packages/web-component/lib')) {
    return wc.loadLibCode(id);
  }
  // 3. handle core file load
  if (id.includes('packages/core/index.ts')) {
    return core.loadIndex(id);
  }
  // 4. handle core lib file load
  if (id.includes('packages/core/lib/index.ts')) {
    return core.loadLib(id);
  }
};

export function shuimoCoreTsx(MODE?: string, options?: { includes?: string, }): Plugin {
  return {
    name: 'shuimo:core-tsx',
    load,
    async transform(code: string, id: string) {

      if (id.includes('.tsx') && id.includes(options?.includes ?? 'packages/core')) {
        let jsxFactory = 'm';
        if (id.includes('?tag=')) {
          const tag = id.match(/\?tag=(.*)/)![1];
          if (tag === 'wc') {
            jsxFactory = 'mWC';
          }
        }
        code = await esbuildTransform(code, jsxFactory);
      }

      return { code, id };
    }
  };
}
