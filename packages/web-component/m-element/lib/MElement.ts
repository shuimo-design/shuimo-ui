/**
 * @description MElement extends HTMLElement, provide some life cycle hooks
 * @author 阿怪
 * @date 2022/12/20 15:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { IMElement, VNodeType } from '../types/template';


export default class MElement<T = any> extends HTMLElement implements IMElement {
  public VNode: VNodeType = {};

  constructor() {super();}

  public beforeInit() {}

  public afterInit() {}

  public beforeMount() {}

  public afterMount() {}

}
