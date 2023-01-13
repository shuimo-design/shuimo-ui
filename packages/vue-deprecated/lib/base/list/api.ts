/**
 * @description list api
 * @author 阿怪
 * @date 2022/4/24 21:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { ListProps } from './index';

export const props: WCOPO<ListProps> = {
  data: { type: Array, default: () => [] },
  autoActive: { type: Boolean, default: false }
};
