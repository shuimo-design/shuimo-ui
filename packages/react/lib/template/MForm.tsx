/**
 * @description react version form
 * @author 阿怪
 * @date 2023/03/10 02:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useForm, FormProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { Slot } from '../types';

export default function MForm(props: FormProps & Slot ) {
  const { getTemplate } = useForm();

  return cr(getTemplate({ props }),props)
}

