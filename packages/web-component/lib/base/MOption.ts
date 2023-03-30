/**
 * @description web-component version option
 * @author 阿怪
 * @date 2023/2/21 17:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { createMElement, MElement } from '@shuimo-design/lit';
import { useOption } from '@shuimo-design/core';

@createMElement({
  name: 'option',
  hookFunc: useOption
})
export default class MOption extends MElement {

}
