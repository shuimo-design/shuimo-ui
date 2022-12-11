/**
 * @description button component
 * @author 阿怪
 * @date 2022/12/10 14:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../../../module/elements/ShuimoElement';
import { customElement } from '../../../module';
import { LineSvgFilter } from '@shuimo-design/core';
import buttonStyle from '@shuimo-design/core/lib/base/button/button.module.css';


@customElement({
  name: 'm-button',
  style: buttonStyle
})
export default class MButton extends ShuimoElement {
  constructor() {
    super();
  }

  render() {
    const div = document.createElement('div');
    div.appendChild(LineSvgFilter());
    const button = document.createElement('button');
    button.className = 'm-button';
    const slot = document.createElement('slot');
    button.appendChild(slot);
    div.appendChild(button);
    return div;
  }
}
