/**
 * @description hook interface
 * @author 阿怪
 * @date 2023/1/14 01:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';


export interface Hook<T, E = any> {
  options: { template: MNodeTemplate, props?: MCOPO<T>, style?: string },
  initProps?: (props: T & HTMLElement, events: E) => void
}

export declare type HookOptions<T> = Hook<T>['options'];
