/**
 * @description table api
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { TableProps } from './props';


export const props: MCOPO<TableProps> = {
  data: { type: Array, default: () => [] },
  height: { type: String, default: null },
  paramClass: { type: Boolean, default: false },
};
