/**
 * @description web-component version formItem
 * @author 阿怪
 * @date 2023/03/10 02:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useFormItem, FormItemProps } from '@shuimo-design/core';

@createMElement({
  name: 'm-form-item',
  hookFunc: useFormItem
})
export default class  extends MElement implements FormItemProps {
  label?: string;
  prop?: string;
}
