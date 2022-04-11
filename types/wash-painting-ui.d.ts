/**
 * @description 类型文件
 * @author 阿怪
 * @date 2021/6/18 12:42 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { App, Directive } from "vue";
import { IMessage } from "./components/WMessage";
import { IPrinter } from "./components/WPrint";
import { IConfirm } from "./components/WConfirm";

export * from './components/components';
export * from './components/hooks';

declare module "wash-painting-ui" {

}

export function createWUI(): {
  install: (app: App<any>) => void
};

export const WMessage: IMessage;
export const WPrinter: IPrinter;
export const WConfirm: IConfirm;
export const WScroll: Directive;

