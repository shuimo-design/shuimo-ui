/**
 * @description a simple javascript ast hook
 * @author 阿怪
 * @date 2023/4/8 16:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * just for shuimo playground javascript
 * 1. support auto export const value
 *    like code is `const a = 1;` playground will inject string `return {a}`,
 */
import useAcorn from '../render/useAcorn';


export default function useJavascriptAST() {
  const { acornParse } = useAcorn();
  const injectVue = (code: string) => {
    const { importStr, endStr } = parse(code);
    return `${importStr}${code};${endStr}`;
  };


  const parse = (code: string) => {
    const { variableList, vueImportList } = acornParse(code);

    return {
      importStr: `const {${vueImportList.join(',')}} = window.vue;`,
      endStr: `return {${variableList.join(',')}};`
    };
  };


  return {
    injectVue,
    parse
  };

}
