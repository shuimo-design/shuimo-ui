/**
 * @description
 * @author 阿怪
 * @date 2023/3/27 18:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

// according to https://stackoverflow.com/questions/47736473/how-to-define-global-function-in-typescript/47736563#47736563
export {};

declare global {
  interface Window {
    shuimo?: {
      wc: { prev: string }
    };
  }
}
