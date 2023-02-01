/**
 * @description
 * @author 阿怪
 * @date 2022/12/20 15:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { MNodeTemplate } from './template';


export declare type VNodeType = {
  name?: string,
  options: MElementOptions
}

export declare type SupportElement = HTMLElement | SVGElement;

export interface IMElement extends HTMLElement {
  VNode: VNodeType;
  /**
   * @description current template
   */
  template: MNodeTemplate;
  componentOptions: MComponentOptions;
  refMap: Map<string, SupportElement>;
  ref?: SupportElement;
  initProps?: (props?: any, events?: any) => void;

  /**
   * @description init template
   * @param t this instance
   */
  initTemplate(t: IMElement): void;

  /**
   * @description before element constructor called
   */
  beforeInit(): void;

  /**
   * @description after element constructor called
   */
  afterInit(): void;

  beforeRender(): void;

  afterRender(): void;

  beforeMount(): void;

  afterMount(): void;

  beforeUpdate(): void;

  afterUpdate(): void;
}

export declare type MElementOptions<T = any> = {
  style?: string,
  template?: MNodeTemplate,
  props?: MCOPO<T>
}

// todo  fix this: usually props is T but sometimes include HTMLElement...
export declare type MInitProps<T = any> = (props: any, events?: any) => void;
export declare type MComponentOptions<T = any> = {
  options: MElementOptions<T>,
  initProps?: MInitProps<T>,
  renderHook?: (ref: Map<string, HTMLElement | SVGElement>) => void
}
export declare type MCreateMelement<T> = {
  name: string,
  hookFunc: (args?: any) => MComponentOptions<T>
}
