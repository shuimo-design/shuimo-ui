/**
 * @description react version border component
 * @author 阿怪
 * @date 2023/2/8 23:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Slot } from '../types';
import { useBorder } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';


export default function MBorder(props: Slot) {
  const { getTemplate } = useBorder();

  return cr(getTemplate(), props);
}
