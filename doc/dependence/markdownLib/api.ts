/**
 * @description md的api处理方法
 * @author 阿怪
 * @date 2022/4/12 09:45
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import * as fs from "fs";


const searchValue = /:::\s*api\s+([\\/.\w-]+)/g;
export default function api() {


  const findAPIAndReplace = (code: string) => {
    return code.replace(
      searchValue,
      (apiStr: string, relativeApiPath: string) => {
        const path = relativeApiPath.endsWith('.md') ? relativeApiPath : `${relativeApiPath}/index.md`;

        // todo 后面上面那个全部换成props,现在是个中间处理方案
        let filePath = `${__dirname}/../../apis/${path}`;
        if (!fs.existsSync(filePath)){
          filePath = `${__dirname}/../../apis/${relativeApiPath.endsWith('.md') ? relativeApiPath : `${relativeApiPath}/props.md`}`
        }

        const fileInfo = fs.readFileSync(filePath, 'utf-8');
        return fileInfo || '';
      });
  }


  return {
    findAPIAndReplace
  }
}
