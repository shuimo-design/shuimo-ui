/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from './props';


type MVNodeRenderParams = {
  if?: boolean,
  show?: boolean,
}
export declare type MNodeTemplate = {
  type: string,
  props?: Record<string, WithArray<string | number | boolean>>,
  children?: Record<string, MNodeTemplate>,
  slots?: string[],
} & MVNodeRenderParams


export declare type MVNode = {
  name: string,
  template?: MNodeTemplate,
  dom?: HTMLElement,
  props?: MNodeTemplate['props'],
  children?: Record<string, MVNode>,
  slots?: MNodeTemplate['slots']
}
