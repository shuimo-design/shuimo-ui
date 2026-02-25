/**
 * @description list api
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { ListProps } from './props';

export const props: MCOPO<ListProps> = {
  data: { type: Array, default: () => [] },
  autoActive: { type: Boolean, default: false },
};
