/**
 * @description janghood config getter
 * @author 阿怪
 * @date 2025/2/23 23:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineJhConfig } from '@janghood/config';

const firstUpperCase = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
};

const sourceSymbolTranslator = (dirList: string[]) => {
  const lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `M${lastDir}`;
};

export const getJanghoodConfig = (options:{
  include: string[];
  exclude: string[];
  packageUrl: string;
}) => {
  return defineJhConfig({
    apiExtractor: {
      include: options.include,
      exclude: options.exclude,
      document: {
        webTypes: {
          packageUrl: options.packageUrl,
          active: true,
          webTypesInfo: {
            framework: 'vue',
            'default-icon': './icons/logo.svg'
          },
          sourceSymbolTranslator
        },
        vscode: {
          active: true,
          packageUrl: options.packageUrl
        }
      },
      annotate: {
        vue: {
          type: 'block',
          onInit: (param) => {
            if (param.name === 'value') {
              param.name = 'modelValue';
            }
            return param;
          }
        }
      }
    }
  });
}
