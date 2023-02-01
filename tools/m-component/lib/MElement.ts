/**
 * @description MElement extends HTMLElement, provide some life cycle hooks
 * @author 阿怪
 * @date 2022/12/20 15:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { IMElement, MComponentOptions, MInitProps, SupportElement, VNodeType } from '../types/template';
import { MNodeTemplate } from '../types/template/template';


export default class MElement<T = any> extends HTMLElement implements IMElement {
  public name: string = '';
  public VNode: VNodeType = { name: '', options: {} };

  public template: MNodeTemplate = { type: '' };

  public componentOptions: MComponentOptions = { options: {} };

  public refMap: Map<string, SupportElement> = new Map();

  public slotMap: Map<string, HTMLSlotElement> = new Map();

  public ref?: SupportElement;

  constructor() {super();}

  public initTemplate(props: MElement, initProps?: MInitProps<T>) {}

  public beforeInit() {}

  public afterInit() {}

  public beforeRender() {}

  public afterRender() {}

  public beforeMount() {}

  public afterMount() {}

  public beforeUpdate() {}

  public afterUpdate() {}

}
