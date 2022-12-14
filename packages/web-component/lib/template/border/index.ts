/**
 * @description border component
 * @author 阿怪
 * @date 2022/12/12 09:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { customElement } from '../../../module';
import ShuimoElement from '../../../module/elements/ShuimoElement';
import { useBorder } from '@shuimo-design/core';
import style from '@shuimo-design/core/lib/template/border/border.css?inline';

const { template } = useBorder();

@customElement({
  name: 'm-border',
  style,
  template
})
export default class MBorder extends ShuimoElement {
  constructor() {super();}

  render(dom?: HTMLElement) {
    return dom;
  }

}
