/**
 * @description table column api
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { TableColumnProps } from './props';


export const props: MCOPO<TableColumnProps> = {
  width: { type: String, default: '' },
  param: { type: String, default: '' },
  label: { type: String, default: '' },
};
