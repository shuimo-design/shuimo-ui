/**
 * @Description: 极客江湖插件配置文件
 * @Author: 阿怪
 * @Date: 2022/4/6 4:55 PM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

const sourceSymbolTranslator = (dirList: string[]) => {
  let lastDir = firstUpperCase(dirList[dirList.length - 1]);
  return `W${lastDir}`;
}

// 后续可以扩展为defineConfig
export default {
  apiExtractor: {
    include: ["lib"],
    exclude: ['dependents'],
    document: {
      webTypes:{
        active: true,
        webTypesInfo: {
          "framework": "vue",
        },
        sourceSymbolTranslator
      }
    }
  }
};
