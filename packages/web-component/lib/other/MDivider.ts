/**
 * @description web-component divider
 * @author 阿怪
 * @date 2023/3/1 22:16
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { createMElement, MElement } from '@shuimo-design/lit';
import { DividerProps, useDivider } from '@shuimo-design/core';

@createMElement({
  name: 'm-divider',
  hookFunc: useDivider
})
export default class MDivider extends MElement implements DividerProps {
  vertical?: boolean;
}
