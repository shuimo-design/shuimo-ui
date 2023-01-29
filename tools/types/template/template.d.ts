/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../props/props';

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

type MVNodeRenderParams = {
  if?: boolean,
  show?: boolean,
}

interface ElementEventListener {
  (event: HTMLElementEvent<any>): void;
}

export type MNodeProps = Record<string, WithArray<string | number | boolean> | ElementEventListener | Record<string, any>>;

export declare type MNodeSlot = MVNodeRenderParams & {
  props?: MNodeProps,
}

export declare type MNodeTemplate = {
  type: string,
  props?: MNodeProps,
  children?: Record<string, MNodeTemplate>,
  slots?: Map<string, MNodeSlot>,
  innerText?: string[],
  initProps?: (templateProps: MCOPO<any>, props: MNodeProps, filter?: string[]) => void,
} & MVNodeRenderParams


export declare type MVNode = {
  name: string,
  template?: MNodeTemplate,
  dom?: HTMLElement,
  props?: MNodeTemplate['props'],
  children?: Record<string, MVNode>,
  slots?: MNodeTemplate['slots']
}

export declare type CustomElementParams = {
  name: string,
  style?: string,
  template?: MNodeTemplate,
  props?: MCOPO<any>
}
