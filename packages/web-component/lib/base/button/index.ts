/**
 * @description button component
 * @author 阿怪
 * @date 2022/12/10 14:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type ButtonProps, useButton } from '@shuimo-design/core';
import { createMElement, MElement } from '@shuimo-design/lit';

@createMElement({
  name: 'm-button',
  hookFunc: useButton
})
export default class MButton extends MElement implements ButtonProps {

  disabled: boolean = false;
  link: boolean = false;
  text: string | undefined;
  type: string = 'default';

}
