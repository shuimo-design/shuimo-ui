/**
 * @description react version MLi
 * @author 阿怪
 * @date 2023/2/14 01:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LiProps, useLi } from '@shuimo-design/core';
import { Slot } from '../types';
import { cr } from '../../tools/coreRender';

export default function MLi(props: LiProps & Slot) {
  const { getTemplate } = useLi();
  return cr(getTemplate({ props }), props);
}
