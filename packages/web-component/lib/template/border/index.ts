/**
 * @description border component
 * @author 阿怪
 * @date 2022/12/12 09:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { useBorder } from '@shuimo-design/core';
import { createMElement, MElement } from '@shuimo-design/lit';

@createMElement({
  name: 'm-border',
  hookFunc: useBorder
})
export default class MBorder extends MElement {
}
