/**
 * @Description: md的demo处理方法
 * @Author: 阿怪
 * @Date: 2022/3/5 1:31 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import * as fs from 'fs';
import { resetCode } from "./code/parseCode";

const searchValue = /:::\s*demo\s+([\\/.\w-]+)/g;
const insertSearchValue = /<p>:::\s*demo\s+([\\/.\w-]+)<\/p>/g;
const pathTransform = (str: string) => {
  const demoPathOnlyLetters = str.replace(/[^a-zA-Z\d]/g, '');
  return `Demo${demoPathOnlyLetters}`;
}

export default function demo() {
  const importMap = new Map();

  /**
   * 用于在md中查找 :::demo [component_name]/[demo_name] 的方法
   * @param code
   */
  const findDemo = (code: string) => {
    code.replace(searchValue, (demoStr: string, relativeDemoPath: string) => {
      const demoDefName = pathTransform(relativeDemoPath);
      importMap.set(demoDefName, `import ${demoDefName} from '/demos/${relativeDemoPath}.vue'`)
      return '';
    });
  }

  /**
   * 用于在md转vue后添加导入的方法
   * @param code
   * @param fileName
   */
  const insertImport = (code: string, fileName: string) => {
    // 添加组件
    const withComponentCode = code.replace(
      insertSearchValue,
      (demoStr: string, relativeDemoPath: string) => {
        const demoDefName = pathTransform(relativeDemoPath);
        const demoData = fs.readFileSync(`${__dirname}/../../demos/${relativeDemoPath}.vue`, 'utf-8')
        if (importMap.has(demoDefName)) {
          return `<${demoDefName} /> ${resetCode(demoData)}`;
        }
        return '';
      })
    const importComponents = Array(...importMap.values()).join('\n');
    // 往setup里添加import
    return withComponentCode.replace('<script setup>', `<script setup>\n${importComponents}`);
  }


  return {
    findDemo,
    insertImport
  }

}
