/**
 * @description table api
 * @author 阿怪
 * @date 2022/4/17 02:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { TableColumnProps } from './tableColumn';
import { TableProps } from './index';

export const props: WCOPO<TableProps> = {
  data: { type: Array, default: () => [] },
  height: { type: String, default: null }
};

export const tableColumnProps: WCOPO<TableColumnProps> = {
  width: { type: String, default: '' },
  param: { type: String, default: '' },
  label: { type: String, default: '' }
};
