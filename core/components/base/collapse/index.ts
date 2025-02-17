/**
 * @description collapse index
 * @author 阿怪
 * @date 2025/02/17 20:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { props } from './api';
import { useCollapse, collapseOptions } from './useCollapse.tsx';

export const CollapseCore = {
  props,
  useCollapse,
  collapseOptions
};
