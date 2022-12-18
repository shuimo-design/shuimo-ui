/**
 * @description ShuimoElement
 * @author 阿怪
 * @date 2022/12/10 13:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/core/types/template/props';
import { attributeTransform } from '../decorators/property';
import { MVNode } from '@shuimo-design/core';

export default class ShuimoElement extends HTMLElement {

  protected VNode: MVNode = { name: '' };

  constructor() {super();}

  public initProps(props?: MCOPO<any>) {
    if (props) {
      Object.keys(props).forEach((key) => {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get() {
            return attributeTransform(props[key].type, this.getAttribute(key));
          },
          set(v: any) {
            this.setAttribute(key, v);
            this.update();
          }
        });
      });
    }
  }

  public beforeMount() {}

  public mount() {}

  public beforeUpdate() {}

  public update() {}

  public afterUpdate() {}


  public beforeRender() {}

  public render() {}

  public afterRender() {}
}
