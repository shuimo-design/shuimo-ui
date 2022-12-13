/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export declare type MNodeTemplate = {
  type: string,
  props?: Record<string, WithArray<string | number | boolean>>,
  children?: MNodeTemplate[],
  slots?: string[],
}
