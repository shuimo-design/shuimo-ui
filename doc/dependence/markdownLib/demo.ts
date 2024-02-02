/**
 * @Description: md的demo处理方法
 * @Author: 阿怪
 * @Date: 2022/3/5 1:31 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import * as fs from 'fs';
import { resetCode } from './code/parseCode';

const searchValue = /:::\s*demo\s+([\\/.\w-]+)/g;
const insertSearchValue = /<p>:::\s*demo\s+([\\/.\w-]+)<\/p>/g;
const pathTransform = (str: string) => {
  const demoPathOnlyLetters = str.replace(/[^a-zA-Z\d]/g, '');
  return `Demo${demoPathOnlyLetters}`;
};

export default function demo() {
  const importMap = new Map();

  /**
   * 用于在md中查找 :::demo [component_name]/[demo_name] 的方法
   * @param code
   */
  const findDemo = (code: string) => {
    code.replace(searchValue, (demoStr: string, relativeDemoPath: string) => {
      const demoDefName = pathTransform(relativeDemoPath);
      importMap.set(demoDefName, `import ${demoDefName} from '/demos/${relativeDemoPath}.vue'`);
      return '';
    });
  };

  /**
   * 用于在md转vue后添加导入的方法
   * @param fileName
   */
  const insertImport = async (code: string) => {
    const replacements: Array<{ demoStr: string, promise: Promise<string> }> = [];
    try{
      code.replace(insertSearchValue, (demoStr: string, relativeDemoPath: string) => {
        const demoDefName = pathTransform(relativeDemoPath);
        const demoData = fs.readFileSync(`${__dirname}/../../demos/${relativeDemoPath}.vue`, 'utf-8');
        if (importMap.has(demoDefName)) {
          const promise = resetCode(demoData)
            .then(newCode => {
              return `<${demoDefName} /> \n${newCode}`;
            });
          replacements.push({ demoStr, promise });
        }
        return '';
      });
    }catch (e){
      console.log(e);
    }

    for (const { demoStr, promise } of replacements) {
      const replacement = await promise;
      code = code.replace(demoStr, replacement);
    }

    const importComponents = Array(...importMap.values()).join('\n');
    return code.replace('<script setup>', `<script setup>\n${importComponents}`);
  };


  return {
    findDemo,
    insertImport
  };

}
