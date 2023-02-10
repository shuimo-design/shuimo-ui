/**
 * @description MElement -> in process
 * @author 阿怪
 * @date 2023/2/5 17:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LitElement } from 'lit';
import { MStrings } from '@shuimo-design/jsx/lib/tools/MStrings';


export class MElement extends LitElement {

  template?: { strings: TemplateStringsArray; values: any[]; };

  constructor() {super();}

  getTemplate() {
    return {
      strings: new MStrings(),
      values: []
    };
  }

}
