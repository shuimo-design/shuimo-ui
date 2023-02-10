/**
 * @description
 * @author 阿怪
 * @date 2023/2/10 10:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export * from '../index';

export declare type ValueResult = { name: string, value: any };
export declare type Result = {
  strings: TemplateStringsArray,
  values: ValueResult[],
  children?: Result[]
}
