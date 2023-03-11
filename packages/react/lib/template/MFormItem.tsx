/**
 * @description react version formItem
 * @author 阿怪
 * @date 2023/03/10 02:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useFormItem, FormItemProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { Slot } from '../types';

export default function MFormItem(props: FormItemProps & Slot) {
  const { getTemplate } = useFormItem();

  return cr(getTemplate({ props }), props);
}

