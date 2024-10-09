/**
 * @description 类型文件
 * @author 阿怪
 * @date 2021/6/18 12:42 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix types
 */
import type { App } from 'vue';
import { IMessage } from './components/MMessage';
import { IPrinter } from './components/MPrint';
import { IConfirm } from './components/MConfirm';
import * as MComponentKeys from './components/components';

export * from './components/components';
export * from './components/hooks';

declare module 'packages/vue/types/shuimo-ui' {}


export type MCKeys = Array<keyof typeof MComponentKeys>;

export interface ShuimoUI {
  install: (app: App) => App;
}

export type MWCType = 'MBorder' | 'MRicePaper';
export type MUIOption = {
  /**
   * if component is Array, means only install these components
   * if component is Object,
   * includes means only install these components
   * excludes means exclude these components
   * excludes has higher priority than includes
   */
  component?: MCKeys | {
    includes?: MCKeys,
    excludes?: MCKeys
  }
  /**
   * we support both web component and vue version of the border and rice-paper components,
   * and we default use web component,
   * you can use this option to disable web component
   */
  disableWebComponent?: Array<MWCType>,
  /**
   * svg inject type,
   * auto means in MSvgIcon component, we will check svg is exist or not,
   * and append by document.append
   *
   * use wrapper you must use component MSvgWrapper wrap your MLi component
   * and svg has id, so you must keep MSvgWrapper component unique.
   */
  svgInject?: 'auto' | 'wrapper' | 'nuxt'
};


export function createMUI(options?: MUIOption): ShuimoUI;

export const MMessage: IMessage;
export const MPrinter: IPrinter;
export const MConfirm: IConfirm;


export type MenuType<T = any> = {
  title: string,
  key: T,
  isActive: boolean,
  index?: number[],
  children?: MenuTypeArr
};
export type MenuTypeArr<T = any> = Array<MenuType<T>>;
