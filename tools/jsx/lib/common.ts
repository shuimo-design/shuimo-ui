/**
 * @description jsx common tools
 * @author 阿怪
 * @date 2023/2/7 02:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const mBoolean = (v: string | boolean | undefined, defaultValue = true) => {
  if (v === 'false') {return false;}
  if (v === 'true') {return true;}
  if (v === undefined || v === null) {return defaultValue;}
  console.warn('m-if or m-show only support string "true" or "false"');
  return false;
};
