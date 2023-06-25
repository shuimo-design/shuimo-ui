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
import type { App, Directive } from 'vue';
// import { IMessage } from './components/MMessage';
// import { IPrinter } from './components/MPrint';
import { IConfirm } from './components/MConfirm';

export * from './components/components';
// export * from './components/hooks';

declare module 'packages/vue/types/shuimo-ui' {}

export interface ShuimoUI {
  install: (app: App) => App;
}

export type MWCType = 'MBorder' | 'MRicePaper';
export type MUIOption = {
  /**
   * we support both web component and vue version of the border and rice-paper components,
   * and we default use web component,
   * you can use this option to disable web component
   */
  disableWebComponent?: Array<MWCType>,
}


export function createMUI(options?: MUIOption): ShuimoUI;

// export const MMessage: IMessage;
// export const MPrinter: IPrinter;
export const MConfirm: IConfirm;
// export const WScroll: Directive;
