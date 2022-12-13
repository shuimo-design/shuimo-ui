/**
 * @description ShuimoElement
 * @author 阿怪
 * @date 2022/12/10 13:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
export default class ShuimoElement extends HTMLElement {

  constructor() {
    super();
  }

  public update(shadow?: ShadowRoot) {

  }

  defineProperty(name: string, from: string) {
    console.log(this.constructor, from);
    Object.defineProperty(this, name, {
      get() {
        console.log(name);
        return this.getAttribute(name);
      },
      set(value: any) {
        this.setAttribute(name, value);
      }
    });
  }


  public render(dom?: HTMLElement): Node | undefined {
    return;
  }
}
