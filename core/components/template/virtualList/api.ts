/**
 * @description 虚拟列表运行时 props
 * @author 阿怪
 * @date 2026/2/25 13:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { VirtualListProps } from './props';

export const props: MCOPO<VirtualListProps> = {
  list: { type: Array, default: () => [] },
  estimatedHeight: { type: Number, default: 40 },
  overScan: { type: Number, default: 1 },
};
