/**
 * @description border component
 * @author 阿怪
 * @date 2022/12/12 09:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { useBorder } from '@shuimo-design/core';
import style from '@shuimo-design/core/lib/template/border/border.css?inline';
import { createMElement, MElement } from 'moelement';

const { template } = useBorder();

@createMElement({
  name: 'm-border',
  style,
  template
})
export default class MBorder extends MElement {
  constructor() {super();}

  render(dom?: HTMLElement) {
    return dom;
  }

}
