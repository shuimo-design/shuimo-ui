/**
 * @description api配置文件
 * @author 阿怪
 * @date 2022/4/12 12:55 AM
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo move to @shuimo-design/config
 */
import { defineJhConfig } from '@janghood/config';


export default defineJhConfig({
  apiExtractor: {
    include: ['../lib/components/**/**/*.d.ts', '../core/components/**/**/*.d.ts'],
    exclude: ['../lib/components/types/*.d.ts', '../core/components/types/*.d.ts'],
    document: {
      markdown: {
        output: 'apis',
        replace: dict => {
          if (dict.startsWith('../core')) {
            return dict.replace('../core/components', '');
          }
          return dict.replace('../lib/components', '');
        },
        active: true,
      },
    },
    annotate: {
      vue: {
        type: 'block',
        onInit: param => {
          if (param.name === 'value') {
            param.name = 'modelValue';
          }
          return param;
        },
      },
    },
  },
  // lint: {
  //   eslint: {
  //     nuxt: true,
  //     include: ['**/*.{vue,ts,tsx,d.ts}'],
  //     exclude: ['**/assets/**', '**/basic/**', '**/node_modules/**'],
  //   },
  //   commitlint: false // todo
  // }
});
