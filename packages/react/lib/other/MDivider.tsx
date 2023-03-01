/**
 * @description react version MDivider
 * @author 阿怪
 * @date 2023/3/1 22:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DividerProps, useDivider } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';


export default function MDivider(props: DividerProps) {
  const { getTemplate } = useDivider();

  return cr(getTemplate({ props }), props);
}
