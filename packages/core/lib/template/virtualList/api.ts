/**
 * @description
 * @author 阿怪
 * @date 2023/07/18 20:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { VirtualListProps } from './index';

export const props: MCOPO<VirtualListProps> = {
  list: { type: Array, default: () => [] },
};
