/**
 * @description vue vite build config
 * @author 阿怪
 * @date 2023/6/7 22:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig, PluginOption } from 'vite';
import fs from 'fs';
import path from 'path';
import { baseRoot, buildConfig, fileName, getPath, plugins as basePlugins, rollupOptions } from './common.config';

const outputRoot = path.resolve(__dirname, '../../../lib/dist');

// init components records
// 扫描lib/components下的所有文件
const componentsTypeFiles = fs.readdirSync(path.resolve(baseRoot, 'components'));
let length = 0;
const entries: Record<string, string> = {};
const componentCssObj: Record<string, string> = {};
componentsTypeFiles.forEach(type => {
  const files = fs.readdirSync(path.resolve(baseRoot, `components/${type}`));
  return files.forEach((componentFileName => {
    // 首先判断是否是文件夹
    const componentPath = path.resolve(baseRoot, `components/${type}/${componentFileName}`);
    const stat = fs.statSync(componentPath);
    if (!stat.isDirectory()) {
      return;
    }
    // 查找内部的tsx文件
    const componentFiles = fs.readdirSync(componentPath);
    // console.log(componentFiles);


    // 首字母大写后前面加M
    // const componentName = `M${componentFileName.charAt(0).toUpperCase()}${componentFileName.slice(1)}.tsx`;

    componentFiles.filter(file => file.startsWith('M') && file.endsWith('.tsx')).forEach(componentName => {
      // 判断是否存在componentName.tsx文件
      const componentFilePath = path.resolve(componentPath, componentName);
      if (!fs.existsSync(componentFilePath)) {
        return;
      }
      length++;

      const smallComponentName = componentName.replace('M', '').replace('.tsx', '');
      // 首字母小写
      const name = `${smallComponentName.charAt(0).toLowerCase()}${smallComponentName.slice(1)}`;
      entries[`${componentPath.replace(`${baseRoot}/`, '')}/${name}`] = componentFilePath;
      componentCssObj[componentFileName] = componentFilePath;
    });


  }));
});
console.log(`共扫描到组件：${length}个`);


const saveCss = (format: 'es', file: string, code: string) => {
  const filePath = path.resolve(outputRoot, `${format}/${file}`);
  path.parse(filePath).dir && fs.mkdirSync(path.parse(filePath).dir, { recursive: true });
  fs.writeFileSync(filePath, code);
};

export class EsConfig {
  public savedCssObj: Record<string, string> = {};

  constructor() {
    this.savedCssObj = {};
  }

  cssBuildPlugin() {
    const self = this;
    return {
      name: 'shuimo:css-build-plugin-pre',
      transform(code, id) {
        if (!(id.includes('lib/components') && id.endsWith('.css'))) {
          return;
        }
        const file = id.replace(`${baseRoot}/`, '');
        const fileName = path.parse(file).name;
        const cssInfo = componentCssObj[fileName];
        if (cssInfo) {
          const outputFileName = `${path.parse(cssInfo.replace(baseRoot, `${outputRoot}/es`)).dir}/${fileName}.mjs`;
          self.savedCssObj[outputFileName] = fileName;
        }
        saveCss('es', file, code);
      },
    };
  };

  get config() {
    return defineConfig({
      plugins: [
        ...basePlugins,
        this.cssBuildPlugin(),
      ],
      build: {
        ...buildConfig,
        outDir: `${outputRoot}/es`,
        minify: false,
        lib: {
          formats: ['es'],
          fileName,
          entry: {
            ...entries,
            'index': getPath('./index.ts'),
          },
        }
      },
    });
  }

}



