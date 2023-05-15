/**
 * @description core hook func type
 * @author 阿怪
 * @date 2023/3/14 16:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../template/template';
import { MCOPO } from '../props/props';


export declare type RefValue = { value: HTMLElement | undefined } | { current: any }
export declare type RefRecord = Record<string, RefValue>;
export interface ICoreHookFunc<Props, Events> {
  options: {
    props?: MCOPO<Props>,
    style?: string,
    ref?:RefRecord
  },
  getTemplate: (options?: {
    props?: Props,
    events?: Events
  }) => MNodeTemplate
}