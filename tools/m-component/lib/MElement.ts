/**
 * @description MElement extends HTMLElement, provide some life cycle hooks
 * @author 阿怪
 * @date 2022/12/20 15:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { IMElement, VNodeType } from '../types/template';
import { MNodeTemplate } from '../types/template/template';


export default class MElement<T = any> extends HTMLElement implements IMElement {
  public VNode: VNodeType = { options: { name: '' } };

  public template: MNodeTemplate = { type: '' };
  public baseTemplate: MNodeTemplate = { type: '' };

  public refMap: Map<string, HTMLElement> = new Map();

  public slotMap: Map<string, HTMLSlotElement> = new Map();

  public ref?: HTMLElement;

  constructor() {super();}

  public initTemplate(t: MElement) {}

  public beforeInit() {}

  public afterInit() {}

  public beforeRender() {}

  public afterRender() {}

  public beforeMount() {}

  public afterMount() {}

  public beforeUpdate() {}

  public afterUpdate() {}

}
