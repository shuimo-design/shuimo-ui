/**
 * @description web-component version form
 * @author 阿怪
 * @date 2023/03/10 02:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useForm, FormProps } from '@shuimo-design/core';

@createMElement({
  name: 'm-form',
  hookFunc: useForm
})
export default class  extends MElement implements FormProps {
  inline?: boolean;
  submit?: boolean;
}
